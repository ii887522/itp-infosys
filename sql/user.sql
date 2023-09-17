-- Test data
INSERT INTO `student` VALUES ('21WMR05319', 'Yong Chi Min', '12345678', '012345-67-8901', 'M', 'RSW', 'yongcm-wm19@student.tarc.edu.my', 'ii887522@gmail.com');
INSERT INTO `student` VALUES ('22WMR05649', 'Har Chun Wai', '87654321', '901234-56-7890', 'M', 'RSW', 'harcw-wm20@student.tarc.edu.my', 'harchunwai25@gmail.com');
INSERT INTO `admin` (username, email, `password`) VALUES ('ii887522', 'ii887522@gmail.com', 'abcdefgh');

-- Fetch user name by student id
SELECT student_name FROM student WHERE student_id = "21WMR05319";

-- Fetch user name by employee email
SELECT emp_name FROM employee WHERE emp_email = "testing1@cmye.com";

-- Fetch user name by admin email
SELECT username FROM `admin` WHERE email = "ii887522@gmail.com";

-- Fetch user name by supervisor id
SELECT supervisor_name FROM supervisor WHERE supervisor_id = "0";
