-- migrate:up
CREATE TABLE `size_pivot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `size_pivot_size_id` (`size_id`),
  KEY `size_pivot_product_id` (`product_id`),
  CONSTRAINT `size_pivot_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `size_pivot_size_id` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP table size_pivot;
