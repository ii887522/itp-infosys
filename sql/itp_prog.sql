-- Test Data
INSERT INTO student VALUES (
	"22WMD05700",
	"Tan Kang Hong",
	"admin",
	"123456-78-9012",
	"Male",
	"RSW - Bachelor of Software Engineering",
	"tankanghong@student.tarc.edu.my",
	"kanghong@gmail.com",
	"FOCS - Faculty of Computing and Information Technology"
);

INSERT INTO student_intern VALUES (
	"22WMD05700",
	1612345678,
	"CMY Enterprise",
	"Doctor Yong",
	1632345678,
	1642345678
);

-- Fetch a page of students from the database
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
WHERE student.student_id > ""
ORDER BY student.student_id
LIMIT 1000;

-- Delete student record from the database
DELETE FROM student WHERE student_id = "21WMR05319";
