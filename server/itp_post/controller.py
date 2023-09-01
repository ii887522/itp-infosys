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
                "get_object", Params={"Bucket": config.custombucket, "Key": f"{company_name}/{row[0]}"}, ExpiresIn=10
            )
            for row in db_rows
        ]

    finally:
        cursor.close()
