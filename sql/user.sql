INSERT INTO `student` VALUES ('21WMR05319', 'Yong Chi Min', '12345678', '012345-67-8901', 'M', 'RSW', 'yongcm-wm19@student.tarc.edu.my', 'ii887522@gmail.com');
INSERT INTO `student` VALUES ('22WMR05649', 'Har Chun Wai', '87654321', '901234-56-7890', 'M', 'RSW', 'harcw-wm20@student.tarc.edu.my', 'harchunwai25@gmail.com');

-- Fetch user name by student id
SELECT student_name FROM student WHERE student_id = "21WMR05319";

-- Fetch user name by employee id
SELECT emp_name FROM employee WHERE emp_id = "1";

-- TODO: Fetch uesr name by admin id


-- TODO: Fetch user name by supervisor id
