-- --------------------------------------------------------
-- Host:                         itp-infosys-db.cokp7ea8echk.us-east-1.rds.amazonaws.com
-- Server version:               10.6.14-MariaDB-log - managed by https://aws.amazon.com/rds/
-- Server OS:                    Linux
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for itp_infosys
DROP DATABASE IF EXISTS `itp_infosys`;
CREATE DATABASE IF NOT EXISTS `itp_infosys` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `itp_infosys`;

-- Dumping structure for table itp_infosys.application
DROP TABLE IF EXISTS `application`;
CREATE TABLE IF NOT EXISTS `application` (
  `student_id` char(10) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `title` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `company_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `note_to_employer` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL DEFAULT '',
  `status` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`student_id`,`title`,`company_name`) USING BTREE,
  KEY `company_name` (`company_name`),
  KEY `FK_application_internship` (`title`,`company_name`),
  CONSTRAINT `FK_application_internship` FOREIGN KEY (`title`, `company_name`) REFERENCES `internship` (`title`, `company_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itp_infosys.application: ~1 rows (approximately)
DELETE FROM `application`;
INSERT INTO `application` (`student_id`, `title`, `company_name`, `note_to_employer`, `status`) VALUES
	('21WMR05319', 'Analyst Programmer', 'CMY Enterprise', '', 'pending'),
	('21WMR05319', 'Backend Developer', 'CMY Enterprise', '', 'pending'),
	('21WMR05319', 'a', 'CMY Enterprise', 'koko', 'pending');

-- Dumping structure for table itp_infosys.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `value` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `itp_title` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `company_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`value`,`itp_title`,`company_name`),
  KEY `FK_company_name` (`company_name`) USING BTREE,
  KEY `FK_category_internship` (`itp_title`,`company_name`),
  CONSTRAINT `FK_category_internship` FOREIGN KEY (`itp_title`, `company_name`) REFERENCES `internship` (`title`, `company_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itp_infosys.category: ~13 rows (approximately)
DELETE FROM `category`;
INSERT INTO `category` (`value`, `itp_title`, `company_name`) VALUES
	('Artifical Intelligence', 'a', 'CMY Enterprise'),
	('Backend', 'Analyst Programmer', 'CMY Enterprise'),
	('Backend', 'Backend Developer', 'CMY Enterprise'),
	('Backend', 'Software Engineer', 'CMY Enterprise'),
	('Cybersecurity', 'Hihi', 'CMY Enterprise'),
	('Data Science', 'Hello World 2', 'CMY Enterprise'),
	('Data Science', 'Hihi', 'CMY Enterprise'),
	('Frontend', 'Analyst Programmer', 'CMY Enterprise'),
	('Frontend', 'Frontend Developer', 'CMY Enterprise'),
	('Frontend', 'Software Engineer', 'CMY Enterprise'),
	('Full Stack', 'Analyst Programmer', 'CMY Enterprise'),
	('Full Stack', 'Software Engineer', 'CMY Enterprise'),
	('Internet of Things', 'Hello World 2', 'CMY Enterprise');

-- Dumping structure for table itp_infosys.company
DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `name` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `size` smallint(5) unsigned NOT NULL DEFAULT 0,
  `address` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `url` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itp_infosys.company: ~1 rows (approximately)
DELETE FROM `company`;
INSERT INTO `company` (`name`, `description`, `size`, `address`, `url`) VALUES
	('CMY Enterprise', 'Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.\r\n\r\n    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.\r\n\r\n    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>', 50, 'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur', 'https://www.tarc.edu.my/');

-- Dumping structure for table itp_infosys.internship
DROP TABLE IF EXISTS `internship`;
CREATE TABLE IF NOT EXISTS `internship` (
  `title` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `company_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `min_allowance` smallint(5) unsigned DEFAULT NULL,
  `max_allowance` smallint(5) unsigned DEFAULT NULL,
  `location` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `vacancy_count` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`title`,`company_name`),
  KEY `company_name` (`company_name`),
  CONSTRAINT `FK_internship_company` FOREIGN KEY (`company_name`) REFERENCES `company` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itp_infosys.internship: ~7 rows (approximately)
DELETE FROM `internship`;
INSERT INTO `internship` (`title`, `company_name`, `min_allowance`, `max_allowance`, `location`, `description`, `vacancy_count`) VALUES
	('Analyst Programmer', 'CMY Enterprise', NULL, NULL, 'Mid Valley City', 'Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.\n\n    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.\n\n    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div></div></div>', 10),
	('Backend Developer', 'CMY Enterprise', 200, 800, 'Kajang', 'Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.\r\n\r\n    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.\r\n\r\n    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>', 4),
	('Frontend Developer', 'CMY Enterprise', NULL, NULL, 'Cheras', 'Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.\r\n\r\n    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.\r\n\r\n    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>', 5),
	('Hello World 2', 'CMY Enterprise', 500, 1400, 'Mid Valley City', 'lolol description&nbsp; &nbsp; &nbsp;', 10),
	('Hihi', 'CMY Enterprise', 300, 1200, 'Taman Connaught', 'no job for u lolz~', 12),
	('Software Engineer', 'CMY Enterprise', 500, 1200, 'Cheras', 'Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.\r\n\r\n    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.\r\n\r\n    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>', 3),
	('a', 'CMY Enterprise', NULL, NULL, 'Cheras', 'a', 1);

-- Dumping structure for table itp_infosys.learning_outcome
DROP TABLE IF EXISTS `learning_outcome`;
CREATE TABLE IF NOT EXISTS `learning_outcome` (
  `value` varchar(128) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `itp_title` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `company_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`value`,`itp_title`,`company_name`),
  KEY `FK_company_name` (`company_name`) USING BTREE,
  KEY `FK_learning_outcome_internship` (`itp_title`,`company_name`),
  CONSTRAINT `FK_learning_outcome_internship` FOREIGN KEY (`itp_title`, `company_name`) REFERENCES `internship` (`title`, `company_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itp_infosys.learning_outcome: ~16 rows (approximately)
DELETE FROM `learning_outcome`;
INSERT INTO `learning_outcome` (`value`, `itp_title`, `company_name`) VALUES
	('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Analyst Programmer', 'CMY Enterprise'),
	('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Backend Developer', 'CMY Enterprise'),
	('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Frontend Developer', 'CMY Enterprise'),
	('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Software Engineer', 'CMY Enterprise'),
	('Lorem ipsum dolor sit amet, consectetur adipiscing elits.', 'Analyst Programmer', 'CMY Enterprise'),
	('Lorem ipsum dolor sit amet, consectetur adipiscing elits.', 'Backend Developer', 'CMY Enterprise'),
	('Lorem ipsum dolor sit amet, consectetur adipiscing elits.', 'Software Engineer', 'CMY Enterprise'),
	('Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.', 'Analyst Programmer', 'CMY Enterprise'),
	('Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.', 'Backend Developer', 'CMY Enterprise'),
	('Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.', 'Software Engineer', 'CMY Enterprise'),
	('a', 'a', 'CMY Enterprise'),
	('abc', 'Hihi', 'CMY Enterprise'),
	('def', 'Hihi', 'CMY Enterprise'),
	('fsadf11', 'Hello World 2', 'CMY Enterprise'),
	('fsdf22', 'Hello World 2', 'CMY Enterprise'),
	('fsdf33', 'Hello World 2', 'CMY Enterprise');

-- Dumping structure for table itp_infosys.photo
DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `url` varchar(3072) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL DEFAULT '',
  `company_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`url`),
  KEY `FK_photo_company` (`company_name`),
  CONSTRAINT `FK_photo_company` FOREIGN KEY (`company_name`) REFERENCES `company` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itp_infosys.photo: ~5 rows (approximately)
DELETE FROM `photo`;
INSERT INTO `photo` (`url`, `company_name`) VALUES
	('1693573544565.jpg', 'CMY Enterprise'),
	('1693573554756.jpeg', 'CMY Enterprise'),
	('1693573564371.webp', 'CMY Enterprise'),
	('1693573575273.jpg', 'CMY Enterprise'),
	('1693573588279.jpeg', 'CMY Enterprise');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
