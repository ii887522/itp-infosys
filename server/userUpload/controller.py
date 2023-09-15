import boto3

from common.db_connection import DbConnection
from flask import Blueprint, request

userUpload_controller = Blueprint("userUpload_controller", __name__)
db_conn = DbConnection.get_instance()
s3 = boto3.client("s3")


@userUpload_controller.route("/company_apply", methods=["POST"])
def company_apply():
    if not request.json:
        return {"code": 4000}

    # Inputs
    student_id = request.json.get("student_id", "")
    company_name = request.json.get("company_name", "")
    company_address = request.json.get("company_address", "")
    monthly_allowance = request.json.get("monthly_allowance", "")
    company_supervisor_name = request.json.get("company_supervisor_name", [])
    company_supervisor_email = request.json.get("company_supervisor_email", [])  

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        # Add student record to the database
        cursor.execute(
            "INSERT INTO placement VALUES (%s, %s, %s, %f, %s, %s, %s, %s)",
            (student_id, company_name, company_address, monthly_allowance, 
             company_supervisor_name, company_supervisor_email),
        )
        db_conn.commit()

        # boto3 subscribe student email
        # confirm email

        # Output
        return {
            "student_id": student_id,
            "company_name": company_name,
            "company_address": company_address,
            "monthly_allowance": monthly_allowance,
            "company_supervisor_name": company_supervisor_name,
            "company_supervisor_email": company_supervisor_email,
        }
    finally:
        cursor.close()
