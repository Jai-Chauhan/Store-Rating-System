USE `store_rating_system`;

DROP TABLE IF EXISTS `stores`;

CREATE TABLE `stores` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(255),
  `address` VARCHAR(400),
  `owner_id` INT UNSIGNED DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_stores_name` (`name`),
  CONSTRAINT `chk_store_name_length` CHECK (CHAR_LENGTH(`name`) >= 1 AND CHAR_LENGTH(`name`) <= 150),
  CONSTRAINT `fk_stores_owner` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;