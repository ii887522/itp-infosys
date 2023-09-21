import boto3
import common.consts as consts
import config
from common.db_connection_pool import DbConnectionPool
from flask import Blueprint, request

userUpload_controller = Blueprint("userUpload_controller", __name__)
db_conn_pool = DbConnectionPool.get_instance()
s3 = boto3.client("s3", consts.AWS_REGION)
sns = boto3.client("sns", consts.AWS_REGION)


@userUpload_controller.route("/company_apply", methods=["POST"])
def company_apply():
    if not request.json:
        return {"code": 4000}

    # Inputs
    studentId = request.json.get("student_id", "")
    company_name = request.json.get("company_name", "")
    company_address = request.json.get("company_address", "")
    monthly_allowance = request.json.get("monthly_allowance", "")
    company_supervisor_name = request.json.get("company_supervisor_name", [])
    company_supervisor_email = request.json.get("company_supervisor_email", [])

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        # Add student record to the database
        cursor.execute(
            "INSERT INTO placement VALUES (%s, %s, %s, %s, %s, %s)",
            (
                studentId,
                company_name,
                company_address,
                int(monthly_allowance),
                company_supervisor_name,
                company_supervisor_email,
            ),
        )
        db_conn.commit()

        # boto3 subscribe student email
        # confirm email

        # Output
        return {
            "studentId": studentId,
            "company_name": company_name,
            "company_address": company_address,
            "monthly_allowance": monthly_allowance,
            "company_supervisor_name": company_supervisor_name,
            "company_supervisor_email": company_supervisor_email,
            "acceptance_upload_url": s3.generate_presigned_post(
                config.custombucket,
                f"companies/{company_name}/acceptance/{studentId}.pdf",
                ExpiresIn=10,
            ),
            "parent_upload_url": s3.generate_presigned_post(
                config.custombucket,
                f"companies/{company_name}/parent/{studentId}.pdf",
                ExpiresIn=10,
            ),
            "letter_upload_url": s3.generate_presigned_post(
                config.custombucket,
                f"companies/{company_name}/letter/{studentId}.pdf",
                ExpiresIn=10,
            ),
        }
    finally:
        cursor.close()
        db_conn.close()


@userUpload_controller.route("/resume_upload", methods=["POST"])
def resume_upload():
    if not request.json:
        return {"code": 4000}

    # Inputs
    studentId = request.json.get("student_id", "")

    return {
        "studentId": studentId,
        "resume_upload_url": s3.generate_presigned_post(
            config.custombucket,
            f"resume/{studentId}.pdf",
            ExpiresIn=10,
        ),
    }


@userUpload_controller.route("/report_upload", methods=["POST"])
def report_upload():
    if not request.json:
        return {"code": 4000}

    # Inputs
    studentId = request.json.get("student_id", "")
    submission_date = request.json.get("submission_date", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        # Add record to the database
        cursor.execute(
            "INSERT INTO submissionDate VALUES (%s, %s)",
            (
                studentId,
                submission_date,
            ),
        )
        db_conn.commit()

        return [
            {
                "studentId": studentId,
                "submission_date": submission_date,
                "report_upload_url": s3.generate_presigned_post(
                    config.custombucket,
                    f"report/{studentId}date/{submission_date}.pdf",
                    ExpiresIn=10,
                ),
            }
        ]

    finally:
        cursor.close()
        db_conn.close()
