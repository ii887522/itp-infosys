import boto3
import config
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
    faculty = request.json.get("faculty", [])

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        # Add student record to the database
        cursor.execute(
            "INSERT INTO student VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (student_id, student_name, password, ic_no, gender, programme, student_email, personal_email, faculty),
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
            (emp_id, emp_name, password, company_name, emp_email, emp_phone),
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


@user_controller.route("/register-sup", methods=['POST'])
def register_supervisor():
    if not request.json:
        return {"code": 4000}

    supervisor_id = request.json.get("supervisor_id", "")
    supervisor_name = request.json.get("supervisor_name", "")
    password = request.json.get("password", "")
    gender = request.json.get("gender", "")
    faculty = request.json.get("faculty", "")
    supervisor_email = request.json.get("supervisor_email", "")

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO supervisor VALUES (%s, %s, %s, %s, %s, %s)",
            (supervisor_id, supervisor_name, password, gender, faculty, supervisor_email),
        )
        db_conn.commit()

        return {
            "supervisor_id": supervisor_id,
            "supervisor_name": supervisor_name,
            "password": password,
            "gender": gender,
            "faculty": faculty,
            "supervisor_email": supervisor_email,
        }

    finally:
        cursor.close()


@user_controller.route("/register-admin", methods=['POST'])
def register_admin():
    if not request.json:
        return {"code": 4000}

    admin_username = request.json.get("username", "")
    admin_email = request.json.get("email", "")
    password = request.json.get("password", "")

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO admin VALUES (%s, %s, %s)",
            (admin_username, admin_email, password)
        )
        db_conn.commit()

        return {
            "username": admin_username,
            "email": admin_email,
            "password": password,
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


@user_controller.route("/login-sup", methods=['POST'])
def login_supervisor():
    if not request.json:
        return {"code": 4000}

    supervisor_id = request.json.get("supervisor_id", "")
    password = request.json.get("password", "")

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        cursor.execute(
            "SELECT * FROM supervisor WHERE supervisor_id = %s AND password = %s",
            (supervisor_id, password)
        )
        supervisor_data = cursor.fetchone()

        if supervisor_data:
            return {"message": "Supervisor login successful", "supervisor_id": supervisor_data[0]}, 200
        else:
            return {"message": "Invalid supervisor ID or password"}, 401

    finally:
        cursor.close()


@user_controller.route("/login-admin", methods=['POST'])
def login_admin():
    if not request.json:
        return {"code": 4000}

    username = request.json.get("username", "")
    password = request.json.get("password", "")

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        cursor.execute("SELECT * FROM admin WHERE username = %s AND password = %s", (username, password))
        admin_data = cursor.fetchone()

        if admin_data:
            return {"message": "Supervisor login successful", "username": admin_data[0]}, 200
        else:
            return {"message": "Invalid username or password"}, 401

    finally:
        cursor.close()


@user_controller.route("/get-student-profile/<student_id>", methods=['GET'])
def get_student_profile(student_id: str):
    db_conn.ping()
    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM student WHERE student_id = %s", (student_id,))
        student_data = cursor.fetchone()

        cursor.execute("SELECT * FROM student_intern WHERE student_id = %s", (student_id,))
        intern_data = cursor.fetchone()

        if student_data and intern_data:
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
                "faculty": student_data[8],
                "supervisor_assigned_at": intern_data[1],
                "company_name": intern_data[2],
                "supervisor_name": intern_data[3],
                "itp_start_at": intern_data[4],
                "itp_end_at": intern_data[5],
            }), 200
        elif student_data:
            return jsonify({
                "student_id": student_data[0],
                "student_name": student_data[1],
                "password": student_data[2],
                "ic_no": student_data[3],
                "gender": student_data[4],
                "programme": student_data[5],
                "student_email": student_data[6],
                "personal_email": student_data[7],
                "faculty": student_data[8],
            })
        else:
            return jsonify({"message": "Student not found"}), 404
    finally:
        cursor.close()


@user_controller.route("/update-stud-profile", methods=['POST'])
def update_stud_profile():
    if not request.json:
        return {"code": 4000}

    # Parse the JSON data sent in the request
    student_id = request.json.get("student_id", "")
    student_name = request.json.get("student_name", "")
    ic_no = request.json.get("ic_no", "")
    gender = request.json.get("gender", [])
    programme = request.json.get("programme", [])
    student_email = request.json.get("student_email", "")
    personal_email = request.json.get("personal_email", "")
    faculty = request.json.get("faculty", [])

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        cursor.execute(
            "UPDATE student SET student_name = %s, ic_no = %s, gender = %s, programme = %s, student_email = %s," +
            " personal_email = %s, faculty = %s WHERE student_id = %s",
            (student_name, ic_no, gender, programme, student_email, personal_email, faculty, student_id),
        )
        db_conn.commit()

        return {"message": "Student profile updated successfully"}, 200

    except Exception as e:
        # Handle any exceptions, log errors, and return an appropriate response
        print("Error updating student profile:", str(e))
        return {"message": "Failed to update student profile"}, 500

    finally:
        cursor.close()


@user_controller.route("/update-stud-password", methods=['POST'])
def update_stud_password():
    if not request.json:
        return {"code": 4000}

    student_id = request.json.get("student_id", "")
    current_password = request.json.get("current_password", "")  # Current password
    new_password = request.json.get("new_password", "")  # New password

    db_conn.ping()
    cursor = db_conn.cursor()

    try:
        # Check if the current password matches the one in the database
        cursor.execute("SELECT password FROM student WHERE student_id = %s", (student_id,))
        stored_password = cursor.fetchone()

        if not stored_password:
            return {"message": "Student not found"}, 404

        if current_password != stored_password[0]:
            return {"message": "Current password does not match"}, 400

        # Update the password to the new one
        cursor.execute("UPDATE student SET password = %s WHERE student_id = %s", (new_password, student_id))
        db_conn.commit()

        return {"message": "Password updated successfully"}, 200

    except Exception as e:
        # Handle any exceptions, log errors, and return an appropriate response
        print("Error updating password:", str(e))
        return {"message": "Failed to update password"}, 500

    finally:
        cursor.close()


@user_controller.route("/update-resume", methods=['PUT'])
def update_resume(student_id: str):
    # Input: Assuming you receive the updated resume file in the request
    """ next = request.args.get("next", "").split("#")
    size = request.args.get("size", 1000, type=int)
    next_title = next[0]
    next_company_name = next[1] if 1 < len(next) else None """

    updated_resume_file = request.files.get("resume")

    if not updated_resume_file:
        return {"message": "Updated resume file not found"}, 400

    s3_key = f"resume/{student_id}.pdf"

    # Upload the updated resume file to S3 and overwrite the existing file
    try:
        s3.upload_fileobj(
            updated_resume_file,
            config.custombucket,
            s3_key,
            ExtraArgs={
                "ContentType": "application/pdf",
                "ContentDisposition": f'inline; filename="{student_id}.pdf"',
            }
        )

        # Output: Provide a success message or any other necessary response
        return {"message": "Resume updated successfully"}, 200

    except Exception as e:
        # Handle any exceptions that may occur during the S3 upload
        print("Error updating resume on S3:", str(e))
        return {"message": "Failed to update resume"}, 500
