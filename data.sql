-- MySQL dump 10.13  Distrib 8.0.23, for osx10.16 (x86_64)
--
-- Host: localhost    Database: code200
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `size_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_product_id` (`product_id`),
  KEY `cart_user_id` (`user_id`),
  KEY `carts_size_id` (`size_id`),
  CONSTRAINT `cart_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_size_id` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1,1,1,1),(5,2,1,3,1),(6,1,1,4,1);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'음료'),(2,'푸드');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `likes_unique` (`users_id`,`product_id`),
  KEY `like_product_id` (`product_id`),
  CONSTRAINT `like_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `like_user_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `size_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id` (`order_id`),
  KEY `order_items_product_id` (`product_id`),
  KEY `order_items_size_id` (`size_id`),
  CONSTRAINT `order_items_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `order_items_size_id` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `order_number` varchar(200) NOT NULL,
  `user_id` int NOT NULL,
  `order_status_id` int NOT NULL,
  `total_price` decimal(12,2) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `delete_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_users_id` (`user_id`),
  CONSTRAINT `orders_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `images_product_id` (`product_id`),
  CONSTRAINT `images_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'https://img-cf.kurly.com/shop/data/goodsview/20210218/gv30000159355_1.jpg'),(2,2,'https://img-cf.kurly.com/shop/data/goodsview/20201209/gv20000141608_1.jpg'),(3,3,'https://img-cf.kurly.com/shop/data/goodsview/20210218/gv30000159309_1.jpg'),(4,4,'https://img-cf.kurly.com/shop/data/goodsview/20211213/gv10000257170_1.jpg'),(5,5,'https://img-cf.kurly.com/shop/data/goodsview/20200304/gv40000083926_1.jpg'),(6,6,'https://img-cf.kurly.com/shop/data/goodsview/20200303/gv20000083647_1.jpg'),(7,7,'https://img-cf.kurly.com/shop/data/goodsview/20200717/gv00000107986_1.jpg'),(8,8,'https://img-cf.kurly.com/shop/data/goodsview/20200306/gv40000084414_1.jpg'),(9,9,'https://img-cf.kurly.com/shop/data/goodsview/20201222/gv20000145373_1.jpg'),(10,10,'https://img-cf.kurly.com/shop/data/goodsview/20190523/gv30000051037_1.jpg'),(11,11,'https://img-cf.kurly.com/shop/data/goodsview/20230315/gv20000503996_1.jpg'),(12,12,'https://img-cf.kurly.com/shop/data/goodsview/20181030/gv00000034358_1.jpg'),(13,13,'https://img-cf.kurly.com/shop/data/goodsview/20210618/gv30000194432_1.jpg'),(14,14,'https://img-cf.kurly.com/shop/data/goodsview/20200625/gv00000103613_1.jpg'),(15,15,'https://img-cf.kurly.com/shop/data/goodsview/20210302/gv00000161993_1.jpg'),(16,16,'https://img-cf.kurly.com/shop/data/goodsview/20210618/gv10000194439_1.jpg'),(17,17,'https://img-cf.kurly.com/shop/data/goodsview/20220615/gv20000036105_1.jpg'),(18,18,'https://img-cf.kurly.com/shop/data/goodsview/20200922/gv00000123123_1.jpg'),(19,19,'https://img-cf.kurly.com/shop/data/goodsview/20180727/gv10000028122_1.jpg'),(20,20,'https://img-cf.kurly.com/shop/data/goodsview/20180628/gv40000026304_1.jpg'),(21,21,'https://img-cf.kurly.com/shop/data/goodsview/20210218/gv30000159350_1.jpg'),(22,22,'https://img-cf.kurly.com/shop/data/goodsview/20210824/gv30000217708_1.jpg'),(23,23,'https://img-cf.kurly.com/shop/data/goodsview/20230126/gv00000480204_1.jpg'),(24,24,'https://img-cf.kurly.com/shop/data/goodsview/20190523/gv00000051041_1.jpg'),(25,25,'https://img-cf.kurly.com/shop/data/goodsview/20210915/gv10000226859_1.jpg'),(26,26,'https://img-cf.kurly.com/shop/data/goodsview/20200624/gv10000103367_1.jpg'),(27,27,'https://img-cf.kurly.com/shop/data/goodsview/20201113/gv30000134623_1.jpg'),(28,28,'https://img-cf.kurly.com/shop/data/goodsview/20200625/gv00000103619_1.jpg'),(29,29,'https://img-cf.kurly.com/shop/data/goodsview/20200326/gv20000050278_1.jpg'),(30,30,'https://img-cf.kurly.com/shop/data/goodsview/20210729/gv20000207155_1.jpg'),(31,31,'https://img-cf.kurly.com/shop/data/goodsview/20210618/gv10000194452_1.jpg'),(32,32,'https://img-cf.kurly.com/shop/data/goodsview/20200303/gv20000083647_1.jpg'),(33,33,'https://img-cf.kurly.com/shop/data/goodsview/20201228/gv20000146996_1.jpg'),(34,34,'https://img-cf.kurly.com/shop/data/goodsview/20210915/gv00000005918_1.jpg');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `incoming_date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `subcategory_id` int NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `delate_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_subcategores_id` (`subcategory_id`),
  CONSTRAINT `products_subcategores_id` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'[KF365] 감자 1kg',6490.00,1,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',2,'2023-05-12 21:49:51',NULL,NULL),(2,'제주 흙당근 1kg',5500.00,2,'2023-05-13','제주도에서 자란 영양 가득 채소',2,'2023-05-12 22:14:14',NULL,NULL),(3,'[KF365] 호박고구마 800g',5990.00,3,'2023-05-13','더욱 촉촉하고 달콤한 호박고구마 (1봉/800g)',2,'2023-05-13 21:16:54',NULL,NULL),(4,'꿀 밤고구마 3kg',14900.00,4,'2023-05-13','촉촉함과 포근함이 배어든',2,'2023-05-13 21:18:02',NULL,NULL),(5,'한끼 감자 300g',2690.00,5,'2023-05-13','보관 걱정 없이 소용량 포장으로 ',2,'2023-05-13 21:19:03',NULL,NULL),(6,'영암 친환경 꿀고구마 2kg',12500.00,6,'2023-05-13','포실포실 달콤한 꿀고구마를 무농약으로 즐기세요',2,'2023-05-13 21:19:57',NULL,NULL),(7,'알배기 배추 1봉',3290.00,7,'2023-05-13','고소하고 달큼한 맛이 일품인 미니 알배기 배추',3,'2023-05-13 21:20:47',NULL,NULL),(8,'경기 시금치 250g',2790.00,8,'2023-05-13','두루 사용되는 국민 엽채류',3,'2023-05-13 21:21:39',NULL,NULL),(9,'청경채 300g',2590.00,9,'2023-05-13','아삭함과 부드러움을 동시에 지닌',3,'2023-05-13 21:23:23',NULL,NULL),(10,'[KF365] 부추 200g',1580.00,1,'2023-05-13','전으로 부쳐도, 무쳐먹어도 맛있는 만능 채소(200g/봉)',3,'2023-05-13 21:24:08',NULL,NULL),(11,'[KF365] GAP 밀양 깻잎 30g',1300.00,2,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',3,'2023-05-13 21:25:04',NULL,NULL),(12,'[KF365] 청상추 150g',1490.00,3,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',3,'2023-05-13 21:25:54',NULL,NULL),(13,'한통 양배추',4290.00,4,'2023-05-13','아삭한 잎에 깃든 달콤함',4,'2023-05-13 21:26:45',NULL,NULL),(14,'[KF365] 브로콜리 1입',2980.00,5,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',4,'2023-05-13 21:27:42',NULL,NULL),(15,'[KF365] 파프리카 2입',3490.00,6,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',4,'2023-05-13 21:28:54',NULL,NULL),(16,'조각 양배추 500g',2025.00,7,'2023-05-13','신선하게 즐기는 아삭 달큰한 채소',4,'2023-05-13 21:29:42',NULL,NULL),(17,'양상추 1입',2871.00,8,'2023-05-13','샐러드에 빠지지 않는 아삭한 양상추',4,'2023-05-13 21:30:47',NULL,NULL),(18,'절단 셀러리 500g',1990.00,9,'2023-05-13','싱그러운 향의 아삭한 채소',4,'2023-05-13 21:31:40',NULL,NULL),(19,'깐대파 500g',2990.00,1,'2023-05-13','만능 양념채소',5,'2023-05-13 21:32:57',NULL,NULL),(20,'양파 1.5kg',4690.00,2,'2023-05-13','최대혜택가 :  3,752원',5,'2023-05-13 21:33:55',NULL,NULL),(21,'[KF365] 깐마늘 200g',2990.00,3,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',5,'2023-05-13 21:34:54',NULL,NULL),(22,'[KF365] 무 1통',1990.00,4,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',5,'2023-05-13 21:35:43',NULL,NULL),(23,'마늘 100% 다진마늘 500g',8990.00,5,'2023-05-13','넉넉하게 챙기는 요리 필수 재료',5,'2023-05-13 21:36:33',NULL,NULL),(24,'깐쪽파 200g',3990.00,6,'2023-05-13','손질이 되어 있어 부담없는 깐쪽파(200g/봉)',5,'2023-05-13 21:37:23',NULL,NULL),(25,'[KF365] 애호박 1개',1990.00,7,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',6,'2023-05-13 21:38:20',NULL,NULL),(26,'[KF365] 다다기오이 3입',3490.00,8,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',6,'2023-05-13 21:39:05',NULL,NULL),(27,'[KF365] 청양고추 200g',2290.00,9,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격, KF365',6,'2023-05-13 21:40:03',NULL,NULL),(28,'[KF365] 가지 2입',2980.00,1,'2023-05-13','믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',6,'2023-05-13 21:40:48',NULL,NULL),(29,'뉴질랜드 단호박 1통',6990.00,2,'2023-05-13','폭실폭실 은은한 단맛 뉴질랜드 단호박(1통)',6,'2023-05-13 21:45:00',NULL,NULL),(30,'홍고추 80g',2690.00,3,'2023-05-13','빨간 맛! 궁금한 요리를 위한 홍고추',6,'2023-05-13 21:45:54',NULL,NULL),(31,'친환경 양파 1kg',4290.00,4,'2023-05-13','최대혜택가 :  3,432원',1,'2023-05-13 21:47:07',NULL,NULL),(32,'영암 친환경 꿀고구마 2kg',12500.00,5,'2023-05-13','영암 친환경 꿀고구마 2kg',1,'2023-05-13 21:47:51',NULL,NULL),(33,'친환경 당근 500g',4980.00,67,'2023-05-13','껍질째 먹을 수 있는 친환경 흙당근 (500g 내외)',1,'2023-05-13 21:49:27',NULL,NULL),(34,'친환경 애호박 1개',3290.00,77,'2023-05-13','구워 먹어도 나물로 무쳐 먹어도 맛있는 만능 채소 애호박 (1개)',1,'2023-05-13 21:50:31',NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_sizes`
--

DROP TABLE IF EXISTS `products_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_sizes_product_id` (`product_id`),
  KEY `products_sizes_size_id` (`size_id`),
  CONSTRAINT `products_sizes_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `products_sizes_size_id` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_sizes`
--

LOCK TABLES `products_sizes` WRITE;
/*!40000 ALTER TABLE `products_sizes` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `content` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rating` decimal(4,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `delete_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `review_product_id` (`product_id`),
  KEY `review_user_id` (`user_id`),
  CONSTRAINT `review_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `review_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20230530131245'),('20230530131418'),('20230530131514'),('20230530131559'),('20230530132218'),('20230530132256'),('20230530132428'),('20230530132543'),('20230530132629'),('20230530132720'),('20230530135350'),('20230530135644'),('20230530140219'),('20230601071118');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '제품사이즈(s,m,l)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'S');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subcategories_category_id` (`category_id`),
  CONSTRAINT `subcategories_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'콜드브루',1),(2,'브루드커피',1),(3,'에스프레소',1),(4,'프라푸치노',1),(5,'블렌디드',1),(6,'브레드',2),(7,'케이크',2),(8,'샌드위치',2),(9,'따뜻한 푸드',2),(10,'과일',2);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone_number` varchar(13) NOT NULL,
  `birthday` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address_detail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `point` decimal(10,2) NOT NULL,
  `agreement_private` tinyint(1) NOT NULL,
  `agreement_marketing` tinyint(1) NOT NULL,
  `agreement_terms` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'강경훈','kgh239@naver.com','010-1111-1111','1992-05-23','남','address','address_detail','$2b$10$L3GVArQSYy96ilDadoChDewAq5M922tw2w.5YrV7rsgkm05hdELsK',100000.00,1,1,1,'2023-06-06 05:08:53',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-06 14:26:04
