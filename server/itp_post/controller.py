import json

import boto3
import config
from common.db_connection import DbConnection
from flask import Blueprint, request

itp_post_controller = Blueprint("itp_post_controller", __name__)
db_conn = DbConnection.get_instance()
s3 = boto3.client("s3")


@itp_post_controller.route("/internships", methods=["GET"])
def list_internships():
    # Input
    next = request.args.get("next", "").split("#")
    size = request.args.get("size", 1000, type=int)
    next_title = next[0]
    next_company_name = next[1] if 1 < len(next) else None

    cursor = db_conn.cursor()

    try:
        # Fetch a page of internships from the database
        cursor.execute(
            """
SELECT
  internship.title,
  internship.company_name,
  JSON_ARRAYAGG(DISTINCT category.`value`) categories,
  min_allowance,
  max_allowance,
  `location`,
  JSON_ARRAYAGG(DISTINCT learning_outcome.`value`) learning_outcomes,
  internship.`description`,
  company.`description` company_description,
  company.size company_size,
  company.address,
  company.url company_url,
  vacancy_count
FROM internship
  LEFT JOIN category
    ON internship.title = category.itp_title AND internship.company_name = category.company_name
  LEFT JOIN learning_outcome
    ON internship.title = learning_outcome.itp_title AND internship.company_name = learning_outcome.company_name
  INNER JOIN company
    ON internship.company_name = company.`name`
WHERE internship.title > ? OR internship.title = ? AND internship.company_name > ?
GROUP BY internship.title, internship.company_name
ORDER BY internship.title, internship.company_name
LIMIT ?
""",
            (next_title, next_title, next_company_name, size),
        )
        db_conn.commit()
        db_rows = cursor.fetchall()

        # Output
        return [
            {
                "title": row[0],
                "company_name": row[1],
                "categories": json.loads(row[2]) if json.loads(row[2]) != [None] else [],
                "min_allowance": row[3],
                "max_allowance": row[4],
                "location": row[5],
                "learning_outcomes": json.loads(row[6]) if json.loads(row[6]) != [None] else [],
                "description": row[7],
                "company_description": row[8],
                "company_size": row[9],
                "address": row[10],
                "company_url": row[11],
                "vacancy_count": row[12],
            }
            for row in db_rows
        ]

    finally:
        cursor.close()


@itp_post_controller.route("/companies/<company_name>/photos", methods=["GET"])
def list_company_photos(company_name: str):
    cursor = db_conn.cursor()

    try:
        # Fetch a list of company photo S3 keys from the database
        cursor.execute("SELECT url FROM photo WHERE company_name = ?", (company_name,))
        db_conn.commit()
        db_rows = cursor.fetchall()

        # Generate S3 presigned URL for each company photo S3 key
        return [
            s3.generate_presigned_url(
                "get_object",
                Params={"Bucket": config.custombucket, "Key": f"companies/{company_name}/photos/{row[0]}"},
            )
            for row in db_rows
        ]

    finally:
        cursor.close()


@itp_post_controller.route(
    "/companies/<company_name>/internships/<internship_title>/applications/<student_id>", methods=["POST"]
)
def apply_internship(company_name: str, internship_title: str, student_id: str):
    # Input
    note_to_employer = request.json.get("note_to_employer", "") if request.json else ""

    cursor = db_conn.cursor()

    try:
        # Create internship application record in the database
        cursor.execute(
            "INSERT INTO application VALUES (?, ?, ?, ?, DEFAULT)",
            (student_id, internship_title, company_name, note_to_employer),
        )
        db_conn.commit()

        # Output
        return {
            "payload": {
                "title": internship_title,
                "company_name": company_name,
                "status": "pending",
                "note_to_employer": note_to_employer,
                "resume_url": s3.generate_presigned_url(
                    "get_object",
                    Params={
                        "Bucket": config.custombucket,
                        "Key": f"companies/{company_name}/internships/{internship_title}/applications/{student_id}.pdf",
                        # So that PDF file will be displayed in the browser instead of being downloaded
                        "ResponseContentType": "application/pdf",
                        "ResponseContentDisposition": f'inline; filename="{student_id}.pdf"',
                    },
                ),
            },
            # Generate S3 presigned URL for the student to upload their resume
            "resume_upload_url": s3.generate_presigned_post(
                config.custombucket,
                f"companies/{company_name}/internships/{internship_title}/applications/{student_id}.pdf",
                ExpiresIn=10,
            ),
        }

    finally:
        cursor.close()


@itp_post_controller.route("/students/<student_id>/applications", methods=["GET"])
def list_student_applications(student_id: str):
    # Input
    next = request.args.get("next", "").split("#")
    size = request.args.get("size", 1000, type=int)
    next_title = next[0]
    next_company_name = next[1] if 1 < len(next) else None

    cursor = db_conn.cursor()

    try:
        # Fetch a page of internship applications from the database
        cursor.execute(
            """
SELECT title, company_name, `status`, note_to_employer
FROM application
WHERE student_id = ? AND (title > ? OR title = ? AND company_name > ?)
ORDER BY title, company_name
LIMIT ?
""",
            (student_id, next_title, next_title, next_company_name, size),
        )
        db_conn.commit()
        db_rows = cursor.fetchall()

        # Output
        return [
            {
                "title": row[0],
                "company_name": row[1],
                "status": row[2],
                "note_to_employer": row[3],
                "resume_url": s3.generate_presigned_url(
                    "get_object",
                    Params={
                        "Bucket": config.custombucket,
                        "Key": f"companies/{row[1]}/internships/{row[0]}/applications/{student_id}.pdf",
                        # So that PDF file will be displayed in the browser instead of being downloaded
                        "ResponseContentType": "application/pdf",
                        "ResponseContentDisposition": f'inline; filename="{student_id}.pdf"',
                    },
                ),
            }
            for row in db_rows
        ]

    finally:
        cursor.close()


@itp_post_controller.route(
    "/companies/<company_name>/internships/<internship_title>/applications/<student_id>", methods=["DELETE"]
)
def cancel_application(company_name: str, internship_title: str, student_id: str):
    cursor = db_conn.cursor()

    try:
        # Delete internship application record from the database
        cursor.execute(
            "DELETE FROM application WHERE student_id = ? AND title = ? AND company_name = ?",
            (student_id, internship_title, company_name),
        )
        db_conn.commit()

        # Output
        return {"title": internship_title, "company_name": company_name}

    finally:
        cursor.close()


@itp_post_controller.route("/companies/<company_name>/internships", methods=["GET"])
def list_posted_internships(company_name: str):
    # Input
    next = request.args.get("next", "")
    size = request.args.get("size", 1000, type=int)

    cursor = db_conn.cursor()

    try:
        # Fetch a page of internships from the database
        cursor.execute(
            """
SELECT
  internship.title,
  JSON_ARRAYAGG(DISTINCT category.`value`) categories,
  min_allowance,
  max_allowance,
  `location`,
  JSON_ARRAYAGG(DISTINCT learning_outcome.`value`) learning_outcomes,
  internship.`description`,
  vacancy_count
FROM internship
  LEFT JOIN category
    ON internship.title = category.itp_title AND internship.company_name = category.company_name
  LEFT JOIN learning_outcome
    ON internship.title = learning_outcome.itp_title AND internship.company_name = learning_outcome.company_name
WHERE internship.company_name = ? AND internship.title > ?
GROUP BY internship.title
ORDER BY internship.title
LIMIT ?
""",
            (company_name, next, size),
        )
        db_conn.commit()
        db_rows = cursor.fetchall()

        # Output
        return [
            {
                "title": row[0],
                "categories": json.loads(row[1]) if json.loads(row[1]) != [None] else [],
                "min_allowance": row[2],
                "max_allowance": row[3],
                "location": row[4],
                "learning_outcomes": json.loads(row[5]) if json.loads(row[5]) != [None] else [],
                "description": row[6],
                "vacancy_count": row[7],
            }
            for row in db_rows
        ]

    finally:
        cursor.close()


@itp_post_controller.route("/internships", methods=["POST"])
def post_internship():
    if not request.json:
        return {"code": 4000}

    # Input
    title = request.json.get("title", "")
    categories = request.json.get("categories", [])
    company_name = request.json.get("company_name", "")
    min_allowance = request.json.get("min_allowance")
    max_allowance = request.json.get("max_allowance")
    location = request.json.get("location", "")
    learning_outcomes = request.json.get("learning_outcomes", [])
    description = request.json.get("description", "")
    vacancy_count = request.json.get("vacancy_count", 1)

    cursor = db_conn.cursor()

    try:
        # Create internship record into the database
        cursor.execute(
            "INSERT INTO internship VALUES (?, ?, ?, ?, ?, ?, ?)",
            (
                title,
                company_name,
                min_allowance if min_allowance != 0 else None,
                max_allowance if max_allowance != 2000 else None,
                location,
                description,
                vacancy_count,
            ),
        )
        cursor.executemany(
            "INSERT INTO category VALUES (?, ?, ?)", [(category, title, company_name) for category in categories]
        )
        cursor.executemany(
            "INSERT INTO learning_outcome VALUES (?, ?, ?)",
            [(learning_outcome, title, company_name) for learning_outcome in learning_outcomes],
        )
        db_conn.commit()

        # Output
        return {
            "title": title,
            "categories": categories,
            "min_allowance": min_allowance,
            "max_allowance": max_allowance,
            "location": location,
            "learning_outcomes": learning_outcomes,
            "description": description,
            "vacancy_count": vacancy_count,
        }

    finally:
        cursor.close()


@itp_post_controller.route("/companies/<company_name>/internships/<internship_title>", methods=["DELETE"])
def remove_internship(company_name: str, internship_title: str):
    cursor = db_conn.cursor()

    try:
        # Delete internship application record from the database
        cursor.execute("DELETE FROM internship WHERE title = ? AND company_name = ?", (internship_title, company_name))
        db_conn.commit()

        # Output
        return {"title": internship_title, "company_name": company_name}

    finally:
        cursor.close()


@itp_post_controller.route("/internships/<old_title>", methods=["PUT"])
def update_internship(old_title: str):
    if not request.json:
        return {"code": 4000}

    # Input
    new_title = request.json.get("title", "")
    categories = request.json.get("categories", [])
    company_name = request.json.get("company_name", "")
    min_allowance = request.json.get("min_allowance")
    max_allowance = request.json.get("max_allowance")
    location = request.json.get("location", "")
    learning_outcomes = request.json.get("learning_outcomes", [])
    description = request.json.get("description", "")
    vacancy_count = request.json.get("vacancy_count", 1)

    cursor = db_conn.cursor()

    try:
        # Update the existing internship record in the database
        cursor.execute(
            """UPDATE internship
SET title = ?, min_allowance = ?, max_allowance = ?, location = ?, `description` = ?, vacancy_count = ?
WHERE title = ? AND company_name = ?""",
            (
                new_title,
                min_allowance if min_allowance != 0 else None,
                max_allowance if max_allowance != 2000 else None,
                location,
                description,
                vacancy_count,
                old_title,
                company_name,
            ),
        )
        cursor.execute("DELETE FROM category WHERE itp_title = ? AND company_name = ?", (new_title, company_name))
        cursor.executemany(
            "INSERT INTO category VALUES (?, ?, ?)", [(category, new_title, company_name) for category in categories]
        )
        cursor.execute(
            "DELETE FROM learning_outcome WHERE itp_title = ? AND company_name = ?", (new_title, company_name)
        )
        cursor.executemany(
            "INSERT INTO learning_outcome VALUES (?, ?, ?)",
            [(learning_outcome, new_title, company_name) for learning_outcome in learning_outcomes],
        )
        db_conn.commit()

        # Output
        return {
            "title": new_title,
            "categories": categories,
            "min_allowance": min_allowance,
            "max_allowance": max_allowance,
            "location": location,
            "learning_outcomes": learning_outcomes,
            "description": description,
            "vacancy_count": vacancy_count,
        }

    finally:
        cursor.close()
