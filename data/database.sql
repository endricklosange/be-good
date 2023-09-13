CREATE DATABASE IF NOT EXISTS `begood` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `begood`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `events` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `title` varchar(50) NOT NULL,
  `organization` text NOT NULL,
  `participant` text NOT NULL,
  `location` varchar(50) DEFAULT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `descritpion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;