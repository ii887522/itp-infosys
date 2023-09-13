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
    return {}
