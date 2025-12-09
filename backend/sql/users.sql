CREATE DATABASE IF NOT EXISTS `store_rating_system`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE `store_rating_system`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` TEXT NOT NULL,
  `address` VARCHAR(400),
  `role` ENUM('Normal User','Store Owner','Admin') NOT NULL DEFAULT 'Normal User',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`),
  CONSTRAINT `chk_name_length` CHECK (CHAR_LENGTH(`name`) >= 20 AND CHAR_LENGTH(`name`) <= 60)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
