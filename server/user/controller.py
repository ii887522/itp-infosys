import boto3
import common.consts as consts
import config
from botocore.exceptions import NoCredentialsError
from common.db_connection_pool import DbConnectionPool
from flask import Blueprint, jsonify, request

user_controller = Blueprint("user_controller", __name__)
db_conn_pool = DbConnectionPool.get_instance()
s3 = boto3.client("s3", consts.AWS_REGION)


# Function to handle student registration
@user_controller.route("/register-stud", methods=["POST"])
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

    db_conn = db_conn_pool.get_connection(pre_ping=True)
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
        db_conn.close()


@user_controller.route("/register-emp", methods=["POST"])
def register_employee():
    if not request.json:
        return {"code": 4000}

    # Inputs
    emp_name = request.json.get("emp_name", "")
    password = request.json.get("password", "")
    company_name = request.json.get("company_name", "")
    emp_email = request.json.get("emp_email", "")
    emp_phone = request.json.get("emp_phone", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
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
        db_conn.close()


@user_controller.route("/register-sup", methods=["POST"])
def register_supervisor():
    if not request.json:
        return {"code": 4000}

    supervisor_id = request.json.get("supervisor_id", "")
    supervisor_name = request.json.get("supervisor_name", "")
    password = request.json.get("password", "")
    gender = request.json.get("gender", "")
    faculty = request.json.get("faculty", "")
    supervisor_email = request.json.get("supervisor_email", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
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
        db_conn.close()


@user_controller.route("/register-admin", methods=["POST"])
def register_admin():
    if not request.json:
        return {"code": 4000}

    admin_username = request.json.get("username", "")
    admin_email = request.json.get("email", "")
    password = request.json.get("password", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO `admin` (username, email, `password`) VALUES (%s, %s, %s)",
            (admin_username, admin_email, password),
        )
        db_conn.commit()
        return {
            "username": admin_username,
            "email": admin_email,
            "password": password,
        }

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/get-companies", methods=["GET"])
def get_companies():
    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()
    try:
        # Query the database to retrieve a list of company names
        cursor.execute("SELECT name FROM company")
        companies = [row[0] for row in cursor.fetchall()]
        return {"companies": companies}
    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/login-stud", methods=["POST"])
def login_student():
    if not request.json:
        return {"code": 4000}

    # Inputs
    student_id = request.json.get("student_id", "")
    password = request.json.get("password", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
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
        db_conn.close()


@user_controller.route("/login-emp", methods=["POST"])
def login_employee():
    if not request.json:
        return {"code": 4000}

    # Inputs
    emp_email = request.json.get("emp_email", "")
    password = request.json.get("password", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        # Query the database to verify employee credentials
        cursor.execute("SELECT * FROM employee WHERE emp_email = %s AND password = %s", (emp_email, password))
        employee_data = cursor.fetchone()

        if employee_data:
            # Employee login successful
            return {
                "message": "Employee login successful",
                "emp_id": employee_data[0],
                "company_name": employee_data[3],
            }, 200
        else:
            # Employee login failed
            return {"message": "Invalid email or password"}, 401

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/login-sup", methods=["POST"])
def login_supervisor():
    if not request.json:
        return {"code": 4000}

    supervisor_id = request.json.get("supervisor_id", "")
    password = request.json.get("password", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute("SELECT * FROM supervisor WHERE supervisor_id = %s AND password = %s", (supervisor_id, password))
        supervisor_data = cursor.fetchone()

        if supervisor_data:
            return {"message": "Supervisor login successful", "supervisor_id": supervisor_data[0]}, 200
        else:
            return {"message": "Invalid supervisor ID or password"}, 401

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/login-admin", methods=["POST"])
def login_admin():
    if not request.json:
        return {"code": 4000}

    username = request.json.get("username", "")
    password = request.json.get("password", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute("SELECT * FROM admin WHERE username = %s AND password = %s", (username, password))
        admin_data = cursor.fetchone()
        if admin_data:
            return {"message": "Admin login successful", "username": admin_data[0]}, 200
        else:
            return {"message": "Invalid username or password"}, 401

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/get-student-profile/<student_id>", methods=["GET"])
def get_student_profile(student_id: str):
    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM student WHERE student_id = %s", (student_id,))
        student_data = cursor.fetchone()

        cursor.execute("SELECT * FROM student_intern WHERE student_id = %s", (student_id,))
        intern_data = cursor.fetchone()

        if student_data and intern_data:
            # Construct and return the student profile
            return (
                jsonify(
                    {
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
                    }
                ),
                200,
            )
        elif student_data:
            return jsonify(
                {
                    "student_id": student_data[0],
                    "student_name": student_data[1],
                    "password": student_data[2],
                    "ic_no": student_data[3],
                    "gender": student_data[4],
                    "programme": student_data[5],
                    "student_email": student_data[6],
                    "personal_email": student_data[7],
                    "faculty": student_data[8],
                }
            )
        else:
            return jsonify({"message": "Student not found"}), 404
    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/users/<user_type>/<user_id>", methods=["GET"])
def get_user_name(user_type: str, user_id: str):
    # Reopen the timed out database connection to avoid PyMySQL interface error
    db_conn = db_conn_pool.get_connection(pre_ping=True)

    cursor = db_conn.cursor()

    try:
        if user_type == "stud":
            # Fetch student name by student id from the database
            cursor.execute("SELECT student_name FROM student WHERE student_id = %s", (user_id,))

        elif user_type == "emp":
            # Fetch employee name by employee id from the database
            cursor.execute("SELECT emp_name FROM employee WHERE emp_email = %s", (user_id,))

        elif user_type == "admin":
            # Output
            return {"result": user_id}

        elif user_type == "sup":
            # Fetch supervisor name by supervisor id from the database
            cursor.execute("SELECT supervisor_name FROM supervisor WHERE supervisor_id = %s", (user_id,))

        db_conn.commit()
        db_row = cursor.fetchone()

        # Output
        return {"result": db_row[0] if db_row else ""}

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/get-emp-profile/<emp_email>", methods=["GET"])
def get_employee_profile(emp_email: str):
    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM employee WHERE emp_email = %s", (emp_email,))
        employee_data = cursor.fetchone()

        if employee_data:
            return jsonify(
                {
                    "emp_name": employee_data[1],
                    "password": employee_data[2],
                    "company_name": employee_data[3],
                    "emp_email": employee_data[4],
                    "emp_phone": employee_data[5],
                }
            )
        else:
            return jsonify({"message": "Student not found"}), 404

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/get-supervisor-profile/<supervisor_id>", methods=["GET"])
def get_supervisor_profile(supervisor_id : str):
    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM supervisor WHERE supervisor_id = %s", (supervisor_id,))
        supervisor_data = cursor.fetchone()

        if supervisor_data:
            return jsonify({
                "supervisor_id": supervisor_data[0],
                "supervisor_name": supervisor_data[1],
                "password": supervisor_data[2],
                "gender": supervisor_data[3],
                "faculty": supervisor_data[4],
                "supervisor_email": supervisor_data[5],
            })
        else:
            return jsonify({"message": "Supervisor not found"}), 404

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/get-admin-profile/<username>", methods=["GET"])
def get_admin_profile(username: str):
    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM admin WHERE username = %s", (username,))
        admin_data = cursor.fetchone()

        if admin_data:
            return jsonify({
                "admin_username": admin_data[1],
                "admin_email": admin_data[2],
                "password": admin_data[3],
            })
        else:
            return jsonify({"message": "Admin not found"}), 404

    finally:
        cursor.close()
        db_conn.close()


# Get company details
@user_controller.route("/get-company-details/<company_name>", methods=["GET"])
def get_company_details(company_name: str):
    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM company WHERE name = %s", (company_name,))
        company_data = cursor.fetchone()

        if company_data:
            return jsonify(
                {
                    "company_name": company_data[0],
                    "company_desc": company_data[1],
                    "company_size": company_data[2],
                    "company_address": company_data[3],
                    "company_url": company_data[4],
                }
            )
        else:
            return jsonify({"message": "Company not found"}), 404

    finally:
        cursor.close()


@user_controller.route("/update-stud-profile", methods=["POST"])
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

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute(
            "UPDATE student SET student_name = %s, ic_no = %s, gender = %s, programme = %s, student_email = %s,"
            + " personal_email = %s, faculty = %s WHERE student_id = %s",
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
        db_conn.close()


@user_controller.route("/update-emp-profile", methods=["POST"])
def update_emp_profile():
    if not request.json:
        return {"code": 4000}

    ori_employee_email = request.json.get("ori_employee_email", "")
    employee_name = request.json.get("employee_name", "")
    company_name = request.json.get("company_name", "")
    employee_email = request.json.get("employee_email", "")
    employee_phone = request.json.get("employee_phone", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute(
            "UPDATE employee SET emp_name = %s, company_name = %s, emp_email = %s, emp_phone = %s WHERE emp_name = %s",
            (employee_name, company_name, employee_email, employee_phone, ori_employee_email),
        )
        db_conn.commit()

        return {"message": "Employee profile updated successfully"}, 200

    except Exception as e:
        print("Error updating employee profile:", str(e))
        return {"message": "Failed to update employee profile"}, 500


@user_controller.route("/update-sup-profile", methods=['POST'])
def update_sup_profile():
    if not request.json:
        return {"code": 4000}

    ori_supervisor_id = request.json.get("ori_supervisor_id", "")
    supervisor_id = request.json.get("supervisor_id", "")
    supervisor_name = request.json.get("supervisor_name", "")
    gender = request.json.get("gender", "")
    faculty = request.json.get("faculty", "")
    supervisor_email = request.json.get("supervisor_email", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute(
            "UPDATE supervisor SET supervisor_id = %s, supervisor_name = %s, gender = %s, faculty = %s," +
            "supervisor_email = %s WHERE supervisor_id = %s",
            (supervisor_id, supervisor_name, gender, faculty, supervisor_email, ori_supervisor_id)
        )
        db_conn.commit()

        return {"message": "Supervisor profile updated successfully"}, 200

    except Exception as e:
        print("Error updating supervisor profile:", str(e))
        return {"message": "Failed to update supervisor profile"}, 500

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/update-admin-profile", methods=['POST'])
def update_admin_profile():
    if not request.json:
        return {"code": 4000}

    ori_username = request.json.get("ori_username", "")
    username = request.json.get("username", "")
    email = request.json.get("email", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute(
            "UPDATE admin SET username = %s, email = %s WHERE username = %s",
            (username, email, ori_username)
        )
        db_conn.commit()

        return {"message": "Admin profile updated successfully"}, 200

    except Exception as e:
        print("Error updating admin profile:", str(e))
        return {"message": "Failed to update admin profile"}, 500

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/update-stud-password", methods=['POST'])
def update_stud_password():
    if not request.json:
        return {"code": 4000}

    student_id = request.json.get("student_id", "")
    current_password = request.json.get("current_password", "")  # Current password
    new_password = request.json.get("new_password", "")  # New password

    db_conn = db_conn_pool.get_connection(pre_ping=True)
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
        db_conn.close()


@user_controller.route("/update-emp-password", methods=["POST"])
def update_emp_password():
    if not request.json:
        return {"code": 4000}

    emp_email = request.json.get("emp_email", "")
    current_password = request.json.get("current_password", "")
    new_password = request.json.get("new_password", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute("SELECT password FROM employee WHERE emp_email = %s", (emp_email,))
        stored_password = cursor.fetchone()

        if not stored_password:
            return {"message": "Employee not found"}, 404

        if current_password != stored_password[0]:
            return {"message": "Current password does not match"}, 400

        cursor.execute("UPDATE employee SET password = %s WHERE emp_email = %s", (new_password, emp_email))
        db_conn.commit()

        return {"message": "Password updated successfully"}, 200

    except Exception as e:
        print("Error updating password:", str(e))
        return {"message": "Failed to update password"}, 500

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/update-sup-password", methods=['POST'])
def update_sup_password():
    if not request.json:
        return {"code": 4000}

    supervisor_id = request.json.get("supervisor_id", "")
    current_password = request.json.get("current_password", "")
    new_password = request.json.get("new_password", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute("SELECT password FROM supervisor WHERE supervisor_id = %s", (supervisor_id,))
        stored_password = cursor.fetchone()

        if not stored_password:
            return {"message": "Supervisor not found"}, 404

        if current_password != stored_password[0]:
            return {"message": "Current password does not match"}, 400

        cursor.execute("UPDATE employee SET password = %s WHERE supervisor_id = %s", (new_password, supervisor_id))
        db_conn.commit()

        return {"message": "Password updated successfully"}, 200

    except Exception as e:
        print("Error updating password:", str(e))
        return {"message": "Failed to update password"}, 500

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/update-admin-password", methods=['POST'])
def update_admin_password():
    if not request.json:
        return {"code": 4000}

    username = request.json.get("username", "")
    current_password = request.json.get("current_password", "")
    new_password = request.json.get("new_password", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute("SELECT password FROM admin WHERE username = %s", (username,))
        stored_password = cursor.fetchone()

        if not stored_password:
            return {"message": "Admin not found"}, 404

        if current_password != stored_password[0]:
            return {"message": "Current password does not match"}, 400

        cursor.execute("UPDATE admin SET password = %s WHERE username = %s", (new_password, username))
        db_conn.commit()

        return {"message": "Password updated successfully"}, 200

    except Exception as e:
        print("Error updating password:", str(e))
        return {"message": "Failed to update password"}, 500

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/update-company-details", methods=['POST'])
def update_company_details():
    if not request.json:
        return {"code": 4000}

    ori_company_name = request.json.get("ori_company_name", "")
    company_name = request.json.get("company_name", "")
    company_desc = request.json.get("company_desc", "")
    company_size = request.json.get("company_size", "")
    company_address = request.json.get("company_address", "")
    company_url = request.json.get("company_url", "")

    db_conn = db_conn_pool.get_connection(pre_ping=True)
    cursor = db_conn.cursor()

    try:
        cursor.execute(
            "UPDATE company SET name = %s, descrption = %s, size = %d, address = %s, url = %s WHERE name = %s",
            (company_name, company_desc, company_size, company_address, company_url, ori_company_name),
        )
        db_conn.commit()

        return {"message": "Company details updated successfully"}, 200

    except Exception as e:
        print("Error updating company details:", str(e))
        return {"message": "Failed to update company details"}, 500

    finally:
        cursor.close()
        db_conn.close()


@user_controller.route("/update-resume/<student_id>", methods=['POST'])
def update_resume(student_id: str):
    # student_id = request.form["student_id"]
    updated_resume_file = request.files["resume"]
    print(updated_resume_file)

    if not updated_resume_file:
        return {"message": "Resume file not found"}, 400

    s3_key = f"resume/{student_id}.pdf"

    # Upload the updated resume file to S3 and overwrite the existing file
    try:
        s3.put_object(Bucket=config.custombucket, Key=s3_key, Body=updated_resume_file)
        bucket_location = boto3.client("s3").get_bucket_location(Bucket=config.custombucket)
        s3_location = bucket_location["LocationConstraint"]

        if s3_location is None:
            s3_location = ""
        else:
            s3_location = "-" + s3_location

        print(s3_location)

        # Output: Provide a success message or any other necessary response
        return {"message": "Resume updated successfully"}, 200

    except Exception as e:
        # Handle any exceptions that may occur during the S3 upload
        print("Error updating resume on S3:", str(e))
        return {"message": "Failed to update resume"}, 500


@user_controller.route("/update-avatar/<user_type>/<username>", methods=['POST'])
def update_avatar(user_type: str, username: str):
    avatar_file = request.files["avatar"]
    print(avatar_file)

    if not avatar_file:
        return {"message": "Resume file not found"}, 400

    s3_key = f"avatar/{user_type}/{username}.png"

    try:
        s3.put_object(Bucket=config.custombucket, Key=s3_key, Body=avatar_file)
        bucket_location = boto3.client("s3").get_bucket_location(Bucket=config.custombucket)
        s3_location = bucket_location["LocationConstraint"]

        if s3_location is None:
            s3_location = ""
        else:
            s3_location = "-" + s3_location

        print(s3_location)
        return {"message": "Avatar uploaded successfully"}, 200

    except Exception as e:
        print("Error updating avatar on S3:", str(e))
        return {"message": "Failed to update avatar"}, 500


@user_controller.route("/get-avatar/<user_type>/<username>", methods=['GET'])
def get_avatar(user_type: str, username: str):
    try:
        s3_key = f"avatar/{user_type}/{username}.png"

        avatar_data = s3.generate_presigned_url(
            "get_object",
            Params={
                "Bucket": config.custombucket,
                "Key": s3_key,
                "ResponseContentType": "image/png",
                "ResponseContentDisposition": f'inline; filename="{username}.png"',
            },
        )
        return {"avatarUrl": avatar_data}

    except NoCredentialsError:
        print("No AWS credentials found.")
        return {"message": "Failed to fetch avatar"}, 500


@user_controller.route("/get-resume-url/<student_id>", methods=['GET'])
def get_resume_url(student_id: str):
    try:
        s3_key = f"resume/{student_id}.pdf"

        # Generate a pre-signed URL for the resume file
        resume_url = s3.generate_presigned_url(
            "get_object",
            Params={
                "Bucket": config.custombucket,
                "Key": s3_key,
                "ResponseContentType": "application/pdf",
                "ResponseContentDisposition": f'inline; filename="{student_id}.pdf"',
            },
            ExpiresIn=3600,  # URL expiration time in seconds
        )

        # Return the pre-signed URL in the response
        return {"resumeUrl": resume_url}

    except NoCredentialsError:
        print("No AWS credentials found.")
        return {"message": "Failed to generate pre-signed URL"}, 500
