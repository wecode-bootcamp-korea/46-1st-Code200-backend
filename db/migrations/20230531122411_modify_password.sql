-- migrate:up
ALTER TABLE users MODIFY COLUMN `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL;

-- migrate:down
ALTER TABLE users DROP COLUMN `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL;
