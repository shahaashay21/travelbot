CREATE DATABASE  IF NOT EXISTS `travelers` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `travelers`;
-- MySQL dump 10.13  Distrib 8.0.11, for macos10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: travelers
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `friends` (
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `block` int(11) NOT NULL DEFAULT '0',
  `request` int(11) NOT NULL DEFAULT '1',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (100000020,100000024,0,0,1,NULL,NULL),(100000020,100000025,0,0,2,NULL,NULL),(100000024,100000025,0,1,5,'2017-11-16 21:03:41','2017-11-16 21:03:41'),(100000037,100000020,0,1,17,'2017-12-06 23:57:47',NULL),(100000037,100000026,0,1,25,'2017-12-07 00:26:34',NULL),(100000037,100000024,0,1,27,'2017-12-07 00:35:27',NULL);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `identity`
--

DROP TABLE IF EXISTS `identity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `identity` (
  `tablename` varchar(10) NOT NULL,
  `lastunkid` int(11) NOT NULL DEFAULT '1',
  UNIQUE KEY `tablename_UNIQUE` (`tablename`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `identity`
--

LOCK TABLES `identity` WRITE;
/*!40000 ALTER TABLE `identity` DISABLE KEYS */;
INSERT INTO `identity` VALUES ('trip',4),('users',38);
/*!40000 ALTER TABLE `identity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `url` mediumtext,
  `description` longtext,
  `type` enum('image','video') NOT NULL,
  `flag_media_place` enum('media','place') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_comments`
--

DROP TABLE IF EXISTS `media_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `media_comments` (
  `trip_place_media_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `like` int(11) DEFAULT NULL,
  `comment` longtext,
  `flag_trip_place_media` int(11) DEFAULT NULL,
  `flag_like_comment` int(11) DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_comments`
--

LOCK TABLES `media_comments` WRITE;
/*!40000 ALTER TABLE `media_comments` DISABLE KEYS */;
INSERT INTO `media_comments` VALUES (1,100000020,NULL,'Nice Trip',1,2,'2017-10-13 06:42:17','2017-10-13 06:42:25',2),(1,100000025,1,' ',1,1,'2017-10-13 06:42:17','2017-10-13 06:42:25',3),(1,100000025,NULL,'Awesome',1,2,'2017-10-13 06:42:17','2017-10-13 06:42:25',4),(2,100000020,NULL,'Greate Places',1,2,'2017-10-13 06:42:17','2017-10-13 06:42:25',5),(1,100000020,NULL,'Mast Pics',1,NULL,'2017-10-13 06:58:50','2017-10-13 06:58:50',7),(1,100000020,NULL,'mast',1,2,'2017-10-13 07:00:29','2017-10-13 07:00:29',8),(1,100000020,NULL,'really good one',1,2,'2017-10-13 07:02:05','2017-10-13 07:02:05',9),(2,100000020,NULL,'what did you do there?',1,2,'2017-10-13 07:02:39','2017-10-13 07:02:39',10),(2,100000020,NULL,'cool',1,2,'2017-10-16 01:25:22','2017-10-16 01:25:22',11),(1,100000020,1,NULL,1,1,'2017-10-16 02:26:00','2017-10-16 02:26:00',13),(2,100000020,1,NULL,1,1,'2017-10-16 02:26:03','2017-10-16 02:26:03',14),(6,100000020,1,NULL,2,1,'2017-10-22 21:48:54','2017-10-22 21:48:54',16),(6,100000020,NULL,'nice',2,2,'2017-10-22 21:48:59','2017-10-22 21:48:59',17),(5,100000020,NULL,'beautiful',2,2,'2017-10-22 21:49:08','2017-10-22 21:49:08',18),(1,100000024,NULL,'thanks all',1,2,'2017-11-07 23:16:48','2017-11-07 23:16:48',21),(2,100000024,NULL,'thanks',1,2,'2017-11-14 03:13:31','2017-11-14 03:13:31',22),(1,100000024,NULL,'thanks',1,2,'2017-11-14 03:13:49','2017-11-14 03:13:49',23),(1,100000024,NULL,'nice',1,2,'2017-11-14 03:13:56','2017-11-14 03:13:56',24),(2,100000024,NULL,'good',1,2,'2017-11-14 05:25:41','2017-11-14 05:25:41',27),(1,100000024,NULL,'good',1,2,'2017-11-14 05:25:52','2017-11-14 05:25:52',28),(2,100000024,NULL,'hmm',1,2,'2017-11-14 05:26:11','2017-11-14 05:26:11',29),(2,100000024,NULL,'yo',1,2,'2017-11-14 05:26:28','2017-11-14 05:26:28',30),(2,100000024,NULL,'hmmmmmmmmm',1,2,'2017-11-14 05:29:31','2017-11-14 05:29:31',31),(2,100000024,NULL,'hh',1,2,'2017-11-16 22:15:33','2017-11-16 22:15:33',40),(2,100000024,NULL,'hello',1,2,'2017-12-04 04:33:08','2017-12-04 04:33:08',41),(8,100000024,NULL,'nice',2,2,'2017-12-04 06:15:35','2017-12-04 06:15:35',42),(2,100000024,NULL,'lkjljljljl',1,2,'2017-12-04 06:22:49','2017-12-04 06:22:49',43),(1,100000037,NULL,'Best pic till date',1,2,'2017-12-04 07:50:22','2017-12-04 07:50:22',46),(1,100000037,1,NULL,2,1,'2017-12-04 07:50:35','2017-12-04 07:50:35',47),(2,100000037,1,NULL,2,1,'2017-12-04 07:50:38','2017-12-04 07:50:38',48),(1,100000037,NULL,'vansh',2,2,'2017-12-04 21:24:24','2017-12-04 21:24:24',49),(1,100000037,1,NULL,1,1,'2017-12-06 03:45:47','2017-12-06 03:45:47',50),(1,100000037,NULL,'Vabsg',1,2,'2017-12-06 03:45:59','2017-12-06 03:45:59',51),(1,100000024,NULL,'jl',1,2,'2017-12-06 05:56:42','2017-12-06 05:56:42',52),(2,NULL,1,NULL,1,1,'2017-12-06 06:26:51','2017-12-06 06:26:51',53),(2,NULL,1,NULL,1,1,'2017-12-06 06:26:53','2017-12-06 06:26:53',54),(2,NULL,1,NULL,1,1,'2017-12-06 06:26:54','2017-12-06 06:26:54',55),(2,NULL,1,NULL,1,1,'2017-12-06 06:26:55','2017-12-06 06:26:55',56),(2,NULL,1,NULL,1,1,'2017-12-06 06:26:55','2017-12-06 06:26:55',57),(2,NULL,1,NULL,1,1,'2017-12-06 06:26:55','2017-12-06 06:26:55',58),(2,NULL,1,NULL,1,1,'2017-12-06 06:26:56','2017-12-06 06:26:56',59),(2,100000024,1,NULL,1,1,'2017-12-06 06:27:30','2017-12-06 06:27:30',60),(1,100000024,1,NULL,1,1,'2017-12-06 23:29:35','2017-12-06 23:29:35',61),(2,100000020,NULL,'Awesome!!',1,2,'2018-07-08 18:47:09','2018-07-08 18:47:09',62);
/*!40000 ALTER TABLE `media_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `notifications` (
  `user_id` int(11) NOT NULL,
  `comment` int(11) DEFAULT NULL,
  `like` int(11) DEFAULT NULL,
  `follow_request` int(11) DEFAULT NULL,
  `read` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `places` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trip_id` int(11) NOT NULL,
  `place_name` varchar(50) DEFAULT NULL,
  `description` longtext,
  `visit_date` datetime NOT NULL,
  `budget` int(11) DEFAULT NULL,
  `type` enum('restaurant','hotel','place','museum') NOT NULL COMMENT 'Place types: restaurant, hotel, place, museum\n\ndescription, budget and persons fields are optional.',
  `persons` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES (1,1,'Lombart Street','Lombard Street is an east–west street in San Francisco, California that is famous for a steep, one-block section with eight hairpin turns','2017-06-24 10:01:07',0,'place',5),(2,1,'Pier 39','Pier 39 is a shopping center and popular tourist attraction built on a pier in San Francisco, California','2017-06-24 12:27:07',0,'place',5),(3,1,'Battery Spencer','Fort Baker 19th-century concrete battery featuring panoramic views of Golden Gate & San Francisco.','2017-06-24 15:30:54',0,'place',5),(4,1,'Hilton San Francisco Union Square','Five star hotel and best view of downtown','2017-06-24 20:45:12',150,'hotel',5),(5,1,'Point Bonita Lighthouse','Point Bonita Lighthouse is a lighthouse located at Point Bonita at the San Francisco Bay entrance in the Marin Headlands near Sausalito, California. ','2017-06-25 11:05:45',0,'place',5),(6,1,'Point Reyes Lighthouse','The Point Reyes Lighthouse, also known as Point Reyes Light or the Point Reyes Light Station, is a lighthouse in the Gulf of the Farallones on Point Reyes in Point Reyes National Seashore, located in Marin County, California','2017-06-25 16:15:36',0,'place',5),(7,2,'Bixby Creek Bridge','Bixby Creek Bridge, also known as Bixby Bridge, on the Big Sur coast of California, is one of the most photographed bridges in California due to its aesthetic design','2017-06-28 10:13:45',0,'place',4),(8,2,'Pfeiffer Beach','Pfeiffer Big Sur State Park is a state park in Monterey County, California, near the area of Big Sur on the state\'s Central Coast','2017-06-28 16:12:15',10,'place',4);
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privacy`
--

DROP TABLE IF EXISTS `privacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `privacy` (
  `user_id` int(11) NOT NULL,
  `follow_request` int(11) DEFAULT '0',
  `content` int(11) DEFAULT '1',
  `contact` int(11) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privacy`
--

LOCK TABLES `privacy` WRITE;
/*!40000 ALTER TABLE `privacy` DISABLE KEYS */;
/*!40000 ALTER TABLE `privacy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('CwivUr-R_01mXr30uMXQUoZs2zv0sVeh',1539619243,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userId\":100000020,\"email\":\"shah.aashay21@gmail.com\",\"name\":\"Aashay shah\",\"profile_pic\":null,\"cover_pic\":null}'),('uf_5Z6K9j-Yp1scLz7Vayyse-b8ulgvX',1539620037,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userId\":100000020,\"email\":\"shah.aashay21@gmail.com\",\"name\":\"Aashay shah\",\"profile_pic\":null,\"cover_pic\":null}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `source` varchar(45) NOT NULL,
  `destination` varchar(45) NOT NULL,
  `budget` varchar(45) DEFAULT NULL,
  `trip_name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100000005 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` VALUES (1,100000024,'2017-06-24 00:00:00','2017-06-25 00:00:00','San Jose','San Francisco','200','SF Toure','Covered all the places in 2 Days. Worth to see all places in San Francisco','2017-10-12 23:11:22','2017-10-12 23:13:31'),(2,100000025,'2017-06-28 00:00:00','2017-06-28 00:00:00','Fremont','Big Sur','100','Big Sur Trip','Big Sur is a rugged stretch of California’s central coast between Carmel and San Simeon. Bordered to the east by the Santa Lucia Mountains and the west by the Pacific Ocean, it’s traversed by narrow, 2-lane State Route 1, known for winding turns, seaside cliffs and views of the often-misty coastline','2017-10-13 00:33:21','2017-10-13 00:33:21'),(100000004,100000020,'2018-12-14 08:00:00','2019-01-09 08:00:00','Dallas','Ahmedabad','5000','India Trour',NULL,'2018-10-14 16:12:45','2018-10-14 16:12:45');
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` mediumtext NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `address` mediumtext,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `verified` int(11) NOT NULL DEFAULT '0',
  `verificationCode` mediumtext,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `profile_pic` varchar(200) DEFAULT NULL,
  `cover_pic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (100000020,'Aashay','shah','shah.aashay21@gmail.com','$2a$05$oxY7.GJU/52K.TPfUuA9xOFfhHZjkGBFXNjDyF92FDobkmTrxbZmO','male',NULL,'Santa Clara',NULL,'United States',0,NULL,'2017-09-24 18:37:18','2018-07-08 18:44:32',NULL,NULL,NULL),(100000024,'Divya','Patel','divya@kloud.io','$2a$05$mcO5rtxy6yYnRFwo3Y0yAez5KIDC4n5XwDKCxmsCI1X6fKdileowu','male',NULL,'San Jose',NULL,'USA',0,NULL,'2017-10-11 01:46:21','2017-12-07 00:55:46','1992-05-05','/images/profile_pics/100000024.jpg','/images/profile_pics/100000024_cover.jpg'),(100000025,'Vansh','Shah','vansha@gmail.com','$2a$05$WKuREgiRwXgug1bnOUQPD.SSHF3wBaw1Ke3DTo.EaCFBkdF.ExMxG',NULL,NULL,NULL,NULL,NULL,0,NULL,'2017-10-12 22:22:53','2017-10-12 22:22:53',NULL,'\\images\\profile_pics\\100000025.jpg','/images/profile_pics/100000025.jpg'),(100000026,'kjh','khk','d@gmail.com','$2a$05$B7ihNzYXjoV66DCES5BtkueoJs9OZ9LIP1m6yEsXZ6IqD3I2bAqG.','male',NULL,'lkjlk',NULL,'ljl',0,NULL,'2017-11-05 05:32:37','2017-11-05 05:32:37',NULL,NULL,NULL),(100000027,'shruti','patil','shruti@gmail.com','$2a$05$cuGwMRJD5ArKvbDagQtKD.CXkA6HwyR9BNdOaTs.RbjeFYC4WXLEi','male',NULL,'san jose',NULL,'usa',0,NULL,'2017-11-05 05:33:03','2017-11-05 05:33:03',NULL,NULL,NULL),(100000028,'afj;kk','kjnkjl','sada@gmail.com','$2a$05$y7gH7bWGWwpFHOhtWYx0nuoOHJijX7mtbkXu/RW68PlMPJr0EZygm','male',NULL,'ssdwd',NULL,'ljljkj',0,NULL,'2017-11-05 05:45:03','2017-11-05 05:45:03',NULL,NULL,NULL),(100000029,'hi','hkjhl','asas@gmail.com','$2a$05$m3c3AIK0b76xs.JQ8GPmgOV818s4GajJUJCBuhq14kw6Z9IaWBLUi','male',NULL,'kjhjk',NULL,'kjh',0,NULL,'2017-11-05 05:46:13','2017-11-05 05:46:13',NULL,NULL,NULL),(100000037,'Vansh','Shah','shahvansh123@gmail.com','$2a$05$/nnrbnxiiuLnyPYdBlwB0ea//oadS9vqryKXQTOUSPhDH2NxI0w0C','male',NULL,'San Jose',NULL,'United States',0,NULL,'2017-12-04 07:18:45','2017-12-04 07:42:19',NULL,'\\images\\profile_pics\\100000037.jpg',NULL),(100000038,'efsdf','nlkjlj','afdfdfdivya@kloud.io','$2a$05$KpC10DIrkYxt.iqgprhPveeeRp/g2Q4sTXY3nCQsDZAvrNWSbfMGa','male',NULL,'mnhgkj',NULL,'hkjhk',0,NULL,'2017-12-04 07:19:28','2017-12-04 07:19:28',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'travelers'
--

--
-- Dumping routines for database 'travelers'
--
/*!50003 DROP FUNCTION IF EXISTS `get_nextid` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `get_nextid`(tblname VARCHAR(255)) RETURNS bigint(20)
BEGIN
	DECLARE lunkid BIGINT;
	DECLARE id VARCHAR(20);
	
	SELECT lastunkid INTO lunkid FROM identity WHERE tablename=tblname;
	SET lunkid = lunkid + 1;
	
	UPDATE identity SET lastunkid=lunkid WHERE tablename=tblname;
	SELECT CONCAT(1 , LPAD(lunkid,8,'0') ) INTO id ;
	
	SET lunkid = id;
	
	RETURN lunkid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-14  9:36:31
