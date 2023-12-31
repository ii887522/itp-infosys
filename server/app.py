import time

import boto3
import config
from common.db_connection_pool import DbConnectionPool
from flask import Flask, render_template, request
from flask_cors import CORS
from itp_company.controller import company_controller
from itp_post.controller import itp_post_controller
from itp_prog.controller import itp_prog_controller
from user.controller import user_controller
from userUpload.controller import userUpload_controller

app = Flask(__name__, static_folder="../dist/spa", static_url_path="/")
db_conn_pool = DbConnectionPool.get_instance()
app.register_blueprint(itp_post_controller, url_prefix="/api/itp-post")
app.register_blueprint(itp_prog_controller, url_prefix="/api/itp-prog")
app.register_blueprint(user_controller, url_prefix="/api/user")
app.register_blueprint(company_controller, url_prefix="/api/itp-company")
app.register_blueprint(userUpload_controller, url_prefix="/api/userUpload")
CORS(app)


@app.errorhandler(404)
def catch_all(error):
    return app.send_static_file("index.html")


@app.route("/about", methods=["POST"])
def about():
    return render_template("www.tarc.edu.my")


@app.route("/stress", methods=["GET"])
def stress():
    # Record start time
    prev = int(time.time())
    now = prev

    # Stress for 10 seconds
    while now - prev < 10:
        # Get current time
        now = int(time.time())

    # Done
    return {}


@app.route("/addemp", methods=["POST"])
def AddEmp():
    emp_id = request.form["emp_id"]
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    pri_skill = request.form["pri_skill"]
    location = request.form["location"]
    emp_image_file = request.files["emp_image_file"]

    insert_sql = "INSERT INTO employee VALUES (%s, %s, %s, %s, %s)"

    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn = db_conn_pool.get_connection(pre_ping=True)

    cursor = db_conn.cursor()

    if emp_image_file.filename == "":
        return "Please select a file"

    try:
        cursor.execute(insert_sql, (emp_id, first_name, last_name, pri_skill, location))
        db_conn.commit()
        emp_name = "" + first_name + " " + last_name
        # Uplaod image file in S3 #
        emp_image_file_name_in_s3 = "emp-id-" + str(emp_id) + "_image_file"
        s3 = boto3.resource("s3")

        try:
            print("Data inserted in MySQL RDS... uploading image to S3...")
            s3.Bucket(config.custombucket).put_object(Key=emp_image_file_name_in_s3, Body=emp_image_file)
            bucket_location = boto3.client("s3").get_bucket_location(Bucket=config.custombucket)
            s3_location = bucket_location["LocationConstraint"]

            if s3_location is None:
                s3_location = ""
            else:
                s3_location = "-" + s3_location

            # object_url = "https://s3{0}.amazonaws.com/{1}/{2}".format(
            #     s3_location,
            #     config.custombucket,
            #     emp_image_file_name_in_s3)

        except Exception as e:
            return str(e)

    finally:
        cursor.close()
        db_conn.close()

    print("all modification done...")
    return render_template("AddEmpOutput.html", name=emp_name)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
