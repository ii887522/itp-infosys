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

-- Update the existing student record in the database
UPDATE student
SET
	student_name = "Yong Chi Min",
	faculty = "FOCS - Faculty of Computing and Information Technology"
WHERE student_id = "21WMR05319";
UPDATE student_intern
SET
	supervisor_assigned_at = 1612345678,
	supervisor_name = "testing imida",
	itp_start_at = 1612345678,
	itp_end_at = 1613345678
WHERE student_id = "21WMR05319";

-- Fetch the current supervisor name assigned to this student
SELECT supervisor_assigned_at, supervisor_name FROM student_intern WHERE student_id = "21WMR05319";

-- Fetch some company info that have accepted this student
SELECT `name`, address
FROM company INNER JOIN student_intern ON company.`name` = student_intern.company_name
WHERE student_id = "21WMR05319";

-- Count the number of students in the database
SELECT COUNT(*) FROM student;

-- Count the number of supervisors in the database
SELECT COUNT(DISTINCT supervisor_name) FROM student_intern;
