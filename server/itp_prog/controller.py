import time

from common.db_connection import DbConnection
from flask import Blueprint, request

itp_prog_controller = Blueprint("itp_prog_controller", __name__)
db_conn = DbConnection.get_instance()


@itp_prog_controller.route("/students", methods=["GET"])
def list_students():
    # Input
    next = request.args.get("next", "")
    size = request.args.get("size", 1000, type=int)

    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn.ping()

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


@itp_prog_controller.route("/students/<student_id>", methods=["DELETE"])
def remove_student(student_id: str):
    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn.ping()

    cursor = db_conn.cursor()

    try:
        # Delete the student record from the database
        cursor.execute("DELETE FROM student WHERE student_id = %s", (student_id,))
        db_conn.commit()

        # Output
        return {"student_id": student_id}

    finally:
        cursor.close()


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
    db_conn.ping()

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
