import boto3
import config
import common.consts as consts
from botocore.exceptions import NoCredentialsError
from common.db_connection_pool import DbConnectionPool
from flask import Blueprint, request, jsonify

company_controller = Blueprint("company_controller", __name__)
db_conn_pool = DbConnectionPool.get_instance()
s3 = boto3.client("s3", consts.AWS_REGION)
sns = boto3.resource("s3", consts.AWS_REGION)


@company_controller.route("/get-companylist", methods=["GET"])
def get_companylist():

    db_conn = db_conn_pool.get_connection(pre_ping=True)

    cursor = db_conn.cursor()
    try:
        cursor.execute("""SELECT name, address, url, description FROM company""")

        db_conn.commit()
        db_rows = cursor.fetchall()

        return [
            {
                "company_name": row[0],
                "company_address": row[1],
                "company_website": row[2],
                "company_desc": row[3],
            }
            for row in db_rows
        ]


    finally:
        cursor.close()
        db_conn.close()

@company_controller.route("/companies/<company_name>", methods=["DELETE"])
def delete_company(company_name: str):

    db_conn = db_conn_pool.get_connection(pre_ping=True)

    cursor = db_conn.cursor()
    try:
        cursor.execute(
            "DELETE FROM company WHERE name=%s",
            (company_name)
        )
        db_conn.commit()

        return {"name": company_name}

    finally:
        cursor.close()
        db_conn.close()




