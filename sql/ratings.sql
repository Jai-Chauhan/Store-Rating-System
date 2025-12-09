USE `store_rating_system`;

DROP TABLE IF EXISTS `ratings`;

CREATE TABLE `ratings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `store_id` INT UNSIGNED NOT NULL,
  `rating` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_user_store` (`user_id`, `store_id`),
  CONSTRAINT `chk_rating_range` CHECK (`rating` >= 1 AND `rating` <= 5),
  CONSTRAINT `fk_ratings_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ratings_store` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;