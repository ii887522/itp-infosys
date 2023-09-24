import time

import boto3
import common.consts as consts
import config
import itp_post.itp_post_consts as itp_post_consts
from common.db_connection_pool import DbConnectionPool
from flask import Blueprint, request

itp_prog_controller = Blueprint("itp_prog_controller", __name__)
db_conn_pool = DbConnectionPool.get_instance()
s3 = boto3.client("s3", consts.AWS_REGION)
sns = boto3.resource("sns", consts.AWS_REGION)
itp_applied_topic = sns.Topic(itp_post_consts.ITP_APPLIED_TOPIC_ARN)


@itp_prog_controller.route("/students", methods=["GET"])
def list_students():
    # Input
    next = request.args.get("next", "")
    size = request.args.get("size", 1000, type=int)

    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn = db_conn_pool.get_connection(pre_ping=True)

    cursor = db_conn.cursor()

    try:
        # Fetch a page of students from the database
        cursor.execute(
            """
SELECT
    student.student_id,
    student_name,
    supervisor_assigned_at,
    faculty,
    address,
    company_name,
    supervisor_name,
    itp_start_at,
    itp_end_at
    FROM student
    LEFT JOIN student_intern
        ON student.student_id = student_intern.student_id
    LEFT JOIN company
        ON company.`name` = student_intern.company_name
WHERE student.student_id > %s
ORDER BY student.student_id
LIMIT %s;
""",
            (next, size),
        )
        db_conn.commit()
        db_rows = cursor.fetchall()

        # Output
        return [
            {
                "student_id": row[0],
                "student_name": row[1],
                "supervisor_assigned_at": row[2],
                "faculty": row[3],
                "location": row[4],
                "company_name": row[5],
                "supervisor_name": row[6],
                "itp_start_at": row[7],
                "itp_end_at": row[8],
            }
            for row in db_rows
        ]

    finally:
        cursor.close()
        db_conn.close()


@itp_prog_controller.route("/students/<student_id>", methods=["DELETE"])
def remove_student(student_id: str):
    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn = db_conn_pool.get_connection(pre_ping=True)

    cursor = db_conn.cursor()

    try:
        # Delete the student record from the database
        cursor.execute("DELETE FROM student WHERE student_id = %s", (student_id,))
        db_conn.commit()

        # Output
        return {"student_id": student_id}

    finally:
        cursor.close()
        db_conn.close()


@itp_prog_controller.route("/students/<student_id>", methods=["PUT"])
def update_student(student_id: str):
    if not request.json:
        return {"code": 4000}

    # Input
    student_name = request.json.get("student_name", "")
    faculty = request.json.get("faculty", "")
    supervisor_name = request.json.get("supervisor_name") if request.json.get("supervisor_name") != "" else None
    itp_start_at = request.json.get("itp_start_at")
    itp_end_at = request.json.get("itp_end_at")

    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn = db_conn_pool.get_connection(pre_ping=True)

    cursor = db_conn.cursor()

    try:
        # Get the current supervisor name assigned to this student
        cursor.execute(
            "SELECT supervisor_assigned_at, supervisor_name FROM student_intern WHERE student_id = %s", (student_id,)
        )
        db_conn.commit()
        db_row = cursor.fetchone()
        old_supervisor_assigned_at = db_row[0] if db_row else None
        old_supervisor_name = db_row[1] if db_row else None

        new_supervisor_assigned_at = (
            old_supervisor_assigned_at if old_supervisor_name == supervisor_name else int(time.time())
        )

        # Update the existing student record in the database
        cursor.execute(
            "UPDATE student SET student_name = %s, faculty = %s WHERE student_id = %s",
            (student_name, faculty, student_id),
        )
        cursor.execute(
            """
UPDATE student_intern
SET supervisor_assigned_at = %s, supervisor_name = %s, itp_start_at = %s, itp_end_at = %s
WHERE student_id = %s
""",
            (
                new_supervisor_assigned_at,
                supervisor_name,
                itp_start_at,
                itp_end_at,
                student_id,
            ),
        )

        # Fetch some company info that have already accepted this student
        cursor.execute(
            """
SELECT `name`, address
FROM company INNER JOIN student_intern ON company.`name` = student_intern.company_name
WHERE student_id = %s
""",
            (student_id,),
        )
        db_conn.commit()
        db_row = cursor.fetchone()
        company_name = db_row[0] if db_row else None
        location = db_row[1] if db_row else None

        # Output
        return {
            "student_id": student_id,
            "student_name": student_name,
            "supervisor_assigned_at": new_supervisor_assigned_at,
            "faculty": faculty,
            "location": location,
            "company_name": company_name,
            "supervisor_name": supervisor_name,
            "itp_start_at": itp_start_at,
            "itp_end_at": itp_end_at,
        }

    finally:
        cursor.close()
        db_conn.close()


@itp_prog_controller.route("/students/count", methods=["GET"])
def count_students():
    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn = db_conn_pool.get_connection(pre_ping=True)

    cursor = db_conn.cursor()

    try:
        # Count the number of students in the database
        cursor.execute("SELECT COUNT(*) FROM student")
        db_conn.commit()
        db_row = cursor.fetchone()

        # Output
        return {"result": db_row[0] if db_row else 0}

    finally:
        cursor.close()
        db_conn.close()


@itp_prog_controller.route("/supervisors/count", methods=["GET"])
def count_supervisors():
    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn = db_conn_pool.get_connection(pre_ping=True)

    cursor = db_conn.cursor()

    try:
        # Count the number of students in the database
        cursor.execute("SELECT COUNT(DISTINCT supervisor_name) FROM student_intern")
        db_conn.commit()
        db_row = cursor.fetchone()

        # Output
        return {"result": db_row[0] if db_row else 0}

    finally:
        cursor.close()
        db_conn.close()


# Function to handle student evaluation
@itp_prog_controller.route("/evaluation", methods=["POST"])
def evaluation_student():
    if not request.json:
        return {"code": 4000}

    # Inputs
    name = request.json.get("name", "")
    email = request.json.get("email", "")
    faculty = request.json.get("faculty", "")
    supervisor = request.json.get("supervisor", "")
    companyName = request.json.get("companyName", "")

    # Second page Asking Evaluation
    satisfaction = request.json.get("satisfaction", "")
    satisfaction2 = request.json.get("satisfaction2", "")
    satisfaction3 = request.json.get("satisfaction3", "")
    satisfaction4 = request.json.get("satisfaction4", "")
    satisfaction5 = request.json.get("satisfaction5", "")
    satisfaction6 = request.json.get("satisfaction6", "")
    satisfaction7 = request.json.get("satisfaction7", "")
    satisfaction8 = request.json.get("satisfaction8", "")
    satisfaction9 = request.json.get("satisfaction9", "")
    satisfaction10 = request.json.get("satisfaction10", "")
    satisfaction11 = request.json.get("satisfaction11", "")
    satisfaction12 = request.json.get("satisfaction12", "")
    satisfaction13 = request.json.get("satisfaction13", "")
    satisfaction14 = request.json.get("satisfaction14", "")
    comments = request.json.get("comments", "")

    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn = db_conn_pool.get_connection(pre_ping=True)

    cursor = db_conn.cursor()

    try:
        # Add student evaluation record to the database
        cursor.execute(
            "INSERT INTO evaluation VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (
                name,
                email,
                faculty,
                supervisor,
                companyName,
                satisfaction,
                satisfaction2,
                satisfaction3,
                satisfaction4,
                satisfaction5,
                satisfaction6,
                satisfaction7,
                satisfaction8,
                satisfaction9,
                satisfaction10,
                satisfaction11,
                satisfaction12,
                satisfaction13,
                satisfaction14,
                comments,
            ),
        )
        db_conn.commit()

        # Output
        return {
            "name": name,
            "email": email,
            "faculty": faculty,
            "supervisor": supervisor,
            "companyName": companyName,
            "satisfaction": satisfaction,
            "satisfaction2": satisfaction2,
            "satisfaction3": satisfaction3,
            "satisfaction4": satisfaction4,
            "satisfaction5": satisfaction5,
            "satisfaction6": satisfaction6,
            "satisfaction7": satisfaction7,
            "satisfaction8": satisfaction8,
            "satisfaction9": satisfaction9,
            "satisfaction10": satisfaction10,
            "satisfaction11": satisfaction11,
            "satisfaction12": satisfaction12,
            "satisfaction13": satisfaction13,
            "satisfaction14": satisfaction14,
            "comments": comments,
        }
    finally:
        cursor.close()
        db_conn.close()


@itp_prog_controller.route("/report", methods=["POST"])
def report_student():
    if not request.json:
        return {"code": 4000}

    # Inputs
    student_id = request.json.get("student_id", "")
    name = request.json.get("name", "")
    email = request.json.get("email", "")
    faculty = request.json.get("faculty", "")
    supervisor = request.json.get("supervisor", "")
    companyName = request.json.get("companyName", "")

    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        # Add student evaluation record to the database
        cursor.execute(
            "INSERT INTO report VALUES (%s, %s, %s, %s, %s)",
            (name, email, faculty, supervisor, companyName),
        )
        db_conn.commit()

        # # Send email confirmation to student after applied
        # itp_applied_topic.publish(
        #     Message=f"Thank you for applying {internship_title} from {company_name}. Your application has been sent to "
        #     f"{company_name}",
        #     Subject="Internship Application Sent",
        #     MessageAttributes={"student_id": {"DataType": "String", "StringValue": student_id}},
        # )

        # Output
        return {
            "name": name,
            "email": email,
            "faculty": faculty,
            "supervisor": supervisor,
            "companyName": companyName,
            "resume_url": s3.generate_presigned_url(
                "get_object",
                Params={
                    "Bucket": config.custombucket,
                    "Key": f"{name}.pdf",
                    # So that PDF file will be displayed in the browser instead of being downloaded
                    "ResponseContentType": "application/pdf",
                    "ResponseContentDisposition": f'inline; filename="{name}.pdf"',
                },
            ),
            # Generate S3 presigned URL for the student to upload their resume
            "uploadReport": s3.generate_presigned_post(
                config.custombucket,
                f"monthly_report/{student_id}.pdf",
                ExpiresIn=10,
            ),
        }
    finally:
        cursor.close()
        db_conn.close()
