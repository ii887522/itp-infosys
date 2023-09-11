# import json

import boto3
# import config
from common.db_connection import DbConnection
from flask import Blueprint, request, jsonify

user_controller = Blueprint("user_controller", __name__)
db_conn = DbConnection.get_instance()
s3 = boto3.client("s3")


# Function to handle student registration
@user_controller.route("/register-stud", methods=['POST'])
def register_student():
    if not request.json:
        return {"code": 4000}

    # Inputs
    student_id = request.json.get("student_id", "")
    student_name = request.json.get("student_name", "")
    password = request.json.get("password", "")
    ic_no = request.json.get("ic_no", "")
    gender = request.json.get("gender", [])
    programme = request.json.get("programme", [])
    student_email = request.json.get("student_email", "")
    personal_email = request.json.get("personal_email", "")

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        # Add student record to the database
        cursor.execute(
            "INSERT INTO student VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (student_id, student_name, password, ic_no, gender, programme, student_email, personal_email),
        )
        db_conn.commit()

        # boto3 subscribe student email
        # confirm email

        # Output
        return {
            "student_id": student_id,
            "student_name": student_name,
            "password": password,
            "ic_no": ic_no,
            "gender": gender,
            "programme": programme,
            "student_email": student_email,
            "personal_email": personal_email,
        }
    finally:
        cursor.close()


@user_controller.route("/register-emp", methods=['POST'])
def register_employee():
    if not request.json:
        return {"code": 4000}

    # Inputs
    emp_name = request.json.get("emp_name", "")
    password = request.json.get("password", "")
    company_name = request.json.get("company_name", "")
    emp_email = request.json.get("emp_email", "")
    emp_phone = request.json.get("emp_phone", "")

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        # Get the maximum emp_id from the employee table
        cursor.execute("SELECT MAX(emp_id) FROM employee")
        max_emp_id = cursor.fetchone()

        if max_emp_id is not None:
            # If a maximum emp_id is found, add 1 to it
            emp_id = max_emp_id[0] + 1
        else:
            # If no emp_id is found (empty table), set emp_id to 1
            emp_id = 1

        # Check if the company name exists in the company table
        cursor.execute("SELECT COUNT(*) FROM company WHERE name = %s", (company_name,))
        count = cursor.fetchone()

        if count == 0:
            # If the company doesn't exist, add it to the "company" table
            cursor.execute("INSERT INTO company (name) VALUES (%s)", (company_name,))
            db_conn.commit()

        # Add employee record to the database
        cursor.execute(
            "INSERT INTO employee VALUES (%s, %s, %s, %s, %s, %s)",
            (emp_id, password, emp_name, company_name, emp_email, emp_phone),
        )
        db_conn.commit()

        # Output
        return {
            "emp_id": emp_id,
            "emp_name": emp_name,
            "password": password,
            "company_name": company_name,
            "emp_email": emp_email,
            "emp_phone": emp_phone,
        }

    finally:
        cursor.close()


@user_controller.route("/get-companies", methods=['GET'])
def get_companies():
    cursor = db_conn.cursor()
    try:
        # Query the database to retrieve a list of company names
        cursor.execute("SELECT name FROM company")
        companies = [row[0] for row in cursor.fetchall()]
        return {"companies": companies}
    finally:
        cursor.close()


@user_controller.route("/login-stud", methods=['POST'])
def login_student():
    if not request.json:
        return {"code": 4000}

    # Inputs
    student_id = request.json.get("student_id", "")
    password = request.json.get("password", "")

    cursor = db_conn.cursor()

    try:
        # Query the database to verify student credentials
        cursor.execute("SELECT * FROM student WHERE student_id = %s AND password = %s", (student_id, password))
        student_data = cursor.fetchone()

        if student_data:
            # Student login successful
            return jsonify({"message": "Student login successful", "student_id": student_data[0]}), 200
        else:
            # Student login failed
            return jsonify({"message": "Invalid student ID or password"}), 401

    finally:
        cursor.close()


@user_controller.route("/login-emp", methods=['POST'])
def login_employee():
    if not request.json:
        return {"code": 4000}

    # Inputs
    emp_email = request.json.get("emp_email", "")
    password = request.json.get("password", "")

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        # Query the database to verify employee credentials
        cursor.execute("SELECT * FROM employee WHERE emp_email = %s AND password = %s", (emp_email, password))
        employee_data = cursor.fetchone()

        if employee_data:
            # Employee login successful
            return {"message": "Employee login successful", "emp_id": employee_data[0]}, 200
        else:
            # Employee login failed
            return {"message": "Invalid email or password"}, 401

    finally:
        cursor.close()


@user_controller.route("/get-student-profile/<student_id>", methods=['GET'])
def get_student_profile(student_id: str):
    db_conn.ping()
    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM student WHERE student_id = %s", (student_id,))
        student_data = cursor.fetchone()
        if student_data:
            # Construct and return the student profile
            return jsonify({
                "student_id": student_data[0],
                "student_name": student_data[1],
                "password": student_data[2],
                "ic_no": student_data[3],
                "gender": student_data[4],
                "programme": student_data[5],
                "student_email": student_data[6],
                "personal_email": student_data[7],
            }), 200
        else:
            return jsonify({"message": "Student not found"}), 404
    finally:
        cursor.close()
