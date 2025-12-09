-- MySQL dump 10.13  Distrib 9.4.0, for macos15.4 (arm64)
--
-- Host: localhost    Database: oodlocal
-- ------------------------------------------------------
-- Server version	8.4.6

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('0bc19c5e-7c02-4571-bb00-f2a724a369bc','a77ac417953dcce231a70d48bfc8b794110ef1458c5dfd35cf93c0169e34a754','2025-11-21 08:12:43.411','20250928100526_setup_new_db',NULL,NULL,'2025-11-21 08:12:43.405',1),('0be8f17b-0613-4627-880c-1e94b2a02ea0','733bb4ee03a067658d7522c2f18f6d8af857ec2c7b3c098b942b33b82911da9d','2025-11-21 08:12:43.402','20250927064334_added_is_verified_model_and_otp',NULL,NULL,'2025-11-21 08:12:43.392',1),('5c13f76e-4abf-4add-a743-db80bdcddeb8','2fc9629f5cccaa51c7c3924a13f597224d7a98d5ca3612a27cd293119a211fac','2025-12-09 11:03:33.454','20251209110333_notification_setup',NULL,NULL,'2025-12-09 11:03:33.440',1),('6e40e689-bdeb-42c3-b8a2-7b0827d2da0a','b1a415f6af1e5d70e7fcf0eced3bb582bf2c88e6a1743d0cfb5e0ee3293c0cc4','2025-11-21 08:12:43.404','20250927064428_changed_to_is_verified_fields',NULL,NULL,'2025-11-21 08:12:43.402',1),('bf9b79d4-0ba1-411a-95f1-e4ffe858288f','e5ae8288615dcb28f45b6a474e0aa022f50b9c14504ac985944a9d392f95caab','2025-11-21 08:12:43.391','20250926173736_added_is_verified_model_and_otp',NULL,NULL,'2025-11-21 08:12:43.387',1),('c224e05a-a630-4002-9e7b-a0a71c156787','5614a45dc163f87c1a9d5f6fc3bcfb68b700a7e07f3539b2b025d10abd20fd69','2025-11-21 08:12:43.418','20251121074356_added_password_for_user',NULL,NULL,'2025-11-21 08:12:43.412',1),('c7c6da9a-8da1-4bbe-adf8-623ae7364af8','766b743a14e8145b503620b26d1791619ef3a74d4f2cafa2b9c06d4ad1e38ced','2025-11-21 08:12:43.387','20250926173522_added_is_verified_model',NULL,NULL,'2025-11-21 08:12:43.378',1),('d46f6790-ce73-4f45-8ac6-f3c4a699753c','a127eb268d58265090f5d90988979688a528425c2ec718ef075f8e061c520961','2025-11-21 08:12:43.370','20250926135815_added_resetotp_field',NULL,NULL,'2025-11-21 08:12:43.174',1),('d6732c48-f9c9-490a-8cb9-daa2f0d1bd7e','f1f37f935dba7f645878ec86027ef3acc01f217a6af2d69182a3c6c32dda1de8','2025-11-21 08:12:43.377','20250926172809_added_is_verified_field',NULL,NULL,'2025-11-21 08:12:43.370',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerProfileId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postalCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_customerProfileId_fkey` (`customerProfileId`),
  CONSTRAINT `addresses_customerProfileId_fkey` FOREIGN KEY (`customerProfileId`) REFERENCES `CustomerProfile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES ('cedd9ab5-2bbb-4846-94e1-c0cceee7fb4b','16159b36-e9c1-4b48-bc66-ffb974010a4c','John Doe','123 Main Street, Apt 4B','New York','NY','10001','USA','9876543210',1,'2025-11-21 08:13:39.476','2025-11-21 08:13:39.476'),('fa1dccfb-1bad-4170-ac3f-0ad52415962e','b11bfcc4-de0c-43db-b5d7-55d96797c3c9','Home','123 Main Street','Mumbai','MH','400001','India','9999999999',1,'2025-12-09 13:27:48.603','2025-12-09 13:27:48.603');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminProfile`
--

DROP TABLE IF EXISTS `AdminProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminProfile` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AdminProfile_userId_key` (`userId`),
  CONSTRAINT `AdminProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminProfile`
--

LOCK TABLES `AdminProfile` WRITE;
/*!40000 ALTER TABLE `AdminProfile` DISABLE KEYS */;
INSERT INTO `AdminProfile` VALUES ('6f637dfe-39b4-4bc2-83d0-ffa039641d88','8eea4373-3854-4579-8f80-04c88b2afb7a',NULL),('a5b96e91-de06-4756-88fc-19bad4048501','d98c1ac3-bb5b-41d8-ad64-761f12a1e194',NULL),('ba350a7d-8d47-46fd-8b9d-b609cfad4c61','96a8b161-3ae8-41bc-a1c9-01940e3bd98e',NULL);
/*!40000 ALTER TABLE `AdminProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BankDetails`
--

DROP TABLE IF EXISTS `BankDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BankDetails` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerProfileId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountHolderName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ifscCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BankDetails_customerProfileId_fkey` (`customerProfileId`),
  CONSTRAINT `BankDetails_customerProfileId_fkey` FOREIGN KEY (`customerProfileId`) REFERENCES `CustomerProfile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BankDetails`
--

LOCK TABLES `BankDetails` WRITE;
/*!40000 ALTER TABLE `BankDetails` DISABLE KEYS */;
INSERT INTO `BankDetails` VALUES ('867da848-dc65-43e5-a326-e471a7b3b862','b11bfcc4-de0c-43db-b5d7-55d96797c3c9','1234567890','John Customer','SBIN000111');
/*!40000 ALTER TABLE `BankDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `customerProfileId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_items_customerProfileId_productId_key` (`customerProfileId`,`productId`),
  KEY `cart_items_productId_fkey` (`productId`),
  CONSTRAINT `cart_items_customerProfileId_fkey` FOREIGN KEY (`customerProfileId`) REFERENCES `CustomerProfile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `cart_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES ('6b56499b-d01a-48e6-a9a4-a212d05ebcd8','cf196ceb-bd31-4937-82ef-a6896770c25e',1,'2025-12-09 13:27:48.596','2025-12-09 13:27:48.596','b11bfcc4-de0c-43db-b5d7-55d96797c3c9'),('f216451f-a1f2-4620-a1ca-02524b10e04d','30596afe-b552-420a-b408-6e6949057f18',4,'2025-12-09 12:59:54.506','2025-12-09 13:00:09.421','16159b36-e9c1-4b48-bc66-ffb974010a4c');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parentId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_parentId_fkey` (`parentId`),
  CONSTRAINT `categories_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('3d4ed51c-debd-4b11-8dea-6c06f7de1996','Electronics','Electronic gadgets and devices',NULL,NULL,1,'2025-12-09 13:27:48.588','2025-12-09 13:27:48.588'),('a950126b-15af-423d-a655-a3f29739f0e0','T shirts','T shirts- cotton','/uploads/categories/1765283621355-566320443.png',NULL,1,'2025-12-09 12:33:41.359','2025-12-09 12:33:41.359'),('cdb5a4b1-64ae-4b87-9940-557a491f497b','Polos','Polos T shirts- cotton','/uploads/categories/1765283641498-671765820.png','a950126b-15af-423d-a655-a3f29739f0e0',1,'2025-12-09 12:34:01.502','2025-12-09 12:34:01.502');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Coupon`
--

DROP TABLE IF EXISTS `Coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Coupon` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `couponName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ValueType` enum('percentage','amount') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'amount',
  `Value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `minimumSpent` decimal(10,2) NOT NULL DEFAULT '0.00',
  `usedByCount` int NOT NULL DEFAULT '1',
  `usageLimitPerPerson` int NOT NULL DEFAULT '1',
  `validFrom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ValidTill` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Coupon_couponName_key` (`couponName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Coupon`
--

LOCK TABLES `Coupon` WRITE;
/*!40000 ALTER TABLE `Coupon` DISABLE KEYS */;
INSERT INTO `Coupon` VALUES ('2c102916-2983-49b8-ae7b-5152d3a32b6c','NEWYEAR2025','percentage','15',500.00,0,2,'2025-01-01T00:00:00.000Z','2025-01-31T23:59:59.000Z','2025-12-09 13:12:46.281','2025-12-09 13:12:46.281'),('8952807c-6705-4246-b8d8-ae353f1caea1','WELCOME10','percentage','10',500.00,1,1,'2025-12-09T13:27:48.598Z','2026-01-08T13:27:48.598Z','2025-12-09 13:27:48.599','2025-12-09 13:27:48.599');
/*!40000 ALTER TABLE `Coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CouponUsage`
--

DROP TABLE IF EXISTS `CouponUsage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CouponUsage` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `couponId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerProfileId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `CouponUsage_couponId_fkey` (`couponId`),
  KEY `CouponUsage_customerProfileId_fkey` (`customerProfileId`),
  CONSTRAINT `CouponUsage_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `CouponUsage_customerProfileId_fkey` FOREIGN KEY (`customerProfileId`) REFERENCES `CustomerProfile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CouponUsage`
--

LOCK TABLES `CouponUsage` WRITE;
/*!40000 ALTER TABLE `CouponUsage` DISABLE KEYS */;
INSERT INTO `CouponUsage` VALUES ('e0eaf558-de19-4689-8801-142895c1923e','8952807c-6705-4246-b8d8-ae353f1caea1','b11bfcc4-de0c-43db-b5d7-55d96797c3c9','2025-12-09 13:27:48.600');
/*!40000 ALTER TABLE `CouponUsage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CustomerProfile`
--

DROP TABLE IF EXISTS `CustomerProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CustomerProfile` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CustomerProfile_userId_key` (`userId`),
  CONSTRAINT `CustomerProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CustomerProfile`
--

LOCK TABLES `CustomerProfile` WRITE;
/*!40000 ALTER TABLE `CustomerProfile` DISABLE KEYS */;
INSERT INTO `CustomerProfile` VALUES ('b11bfcc4-de0c-43db-b5d7-55d96797c3c9','5ffe18b1-ac80-4325-a0f4-e0d905d1e1bf'),('16159b36-e9c1-4b48-bc66-ffb974010a4c','8be725f9-0a0c-419d-9b81-c19f91c870f7');
/*!40000 ALTER TABLE `CustomerProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeviceToken`
--

DROP TABLE IF EXISTS `DeviceToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DeviceToken` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceToken`
--

LOCK TABLES `DeviceToken` WRITE;
/*!40000 ALTER TABLE `DeviceToken` DISABLE KEYS */;
INSERT INTO `DeviceToken` VALUES ('cf9cd7e4-d8ca-4edc-8065-90b5e4ee9970','5ffe18b1-ac80-4325-a0f4-e0d905d1e1bf','dummy-device-token','2025-12-09 13:27:48.617');
/*!40000 ALTER TABLE `DeviceToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notification` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `scheduledAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `readAt` datetime(3) DEFAULT NULL,
  `channels` json DEFAULT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Notification_userId_fkey` (`userId`),
  CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
INSERT INTO `Notification` VALUES ('a9fb8d42-4810-46ed-ba46-e5c6687375c0','d98c1ac3-bb5b-41d8-ad64-761f12a1e194','Welcome Admin','Your admin account is created.',NULL,0,NULL,'2025-12-09 13:27:48.615',NULL,NULL,NULL);
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NotifyMe`
--

DROP TABLE IF EXISTS `NotifyMe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NotifyMe` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `NotifyMe_productId_fkey` (`productId`),
  CONSTRAINT `NotifyMe_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NotifyMe`
--

LOCK TABLES `NotifyMe` WRITE;
/*!40000 ALTER TABLE `NotifyMe` DISABLE KEYS */;
INSERT INTO `NotifyMe` VALUES ('6419bb76-45db-4166-b19d-c1b29f5ed17c','cf196ceb-bd31-4937-82ef-a6896770c25e');
/*!40000 ALTER TABLE `NotifyMe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `discountedPrice` decimal(10,2) NOT NULL,
  `actualPrice` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_orderId_fkey` (`orderId`),
  KEY `order_items_productId_fkey` (`productId`),
  CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES ('43d24800-fc2c-4d2c-9932-92126891f297','ebf67b22-02b9-4b9a-919f-2a0e2659bdf6','cf196ceb-bd31-4937-82ef-a6896770c25e',1,900.00,1000.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','confirmed','processing','shipped','delivered','cancelled','refunded') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paymentStatus` enum('pending','completed','failed','refunded') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `totalAmount` decimal(10,2) NOT NULL,
  `shippingCost` decimal(10,2) NOT NULL DEFAULT '0.00',
  `taxAmount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discountAmount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shippingAddressId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trackingID` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `customerProfileId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_orderNumber_key` (`orderNumber`),
  UNIQUE KEY `orders_trackingID_key` (`trackingID`),
  KEY `orders_shippingAddressId_fkey` (`shippingAddressId`),
  KEY `orders_customerProfileId_fkey` (`customerProfileId`),
  CONSTRAINT `orders_customerProfileId_fkey` FOREIGN KEY (`customerProfileId`) REFERENCES `CustomerProfile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `orders_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('ebf67b22-02b9-4b9a-919f-2a0e2659bdf6','ORDER001','pending','pending',900.00,50.00,20.00,100.00,NULL,'fa1dccfb-1bad-4170-ac3f-0ad52415962e',NULL,'2025-12-09 13:27:48.604','2025-12-09 13:27:48.604','b11bfcc4-de0c-43db-b5d7-55d96797c3c9');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `method` enum('credit_card','debit_card','paypal','stripe','bank_transfer','cash_on_delivery') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','completed','failed','refunded') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `transactionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gatewayResponse` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_orderId_fkey` (`orderId`),
  CONSTRAINT `payments_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES ('c90d795f-ad5f-4e12-9563-4762529b666d','ebf67b22-02b9-4b9a-919f-2a0e2659bdf6',900.00,'credit_card','completed','TXN12345',NULL,'2025-12-09 13:27:48.608','2025-12-09 13:27:48.608');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `altText` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isMain` tinyint(1) NOT NULL DEFAULT '0',
  `sortOrder` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `product_images_productId_fkey` (`productId`),
  CONSTRAINT `product_images_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES ('4b3b8a59-a612-44b9-9327-eb105636fcd4','cf196ceb-bd31-4937-82ef-a6896770c25e','https://example.com/product1.png',NULL,1,0);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discountedPrice` decimal(10,2) NOT NULL,
  `actualPrice` decimal(10,2) NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stockCount` int NOT NULL DEFAULT '0',
  `isStock` tinyint(1) NOT NULL DEFAULT '1',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_categoryId_fkey` (`categoryId`),
  CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('30596afe-b552-420a-b408-6e6949057f18','cotton-blended v neck t shirt for men',599.00,699.00,'cotton blended casual T-shirt',40,1,1,'2025-12-09 12:43:06.507','2025-12-09 12:59:54.509','cdb5a4b1-64ae-4b87-9940-557a491f497b'),('cf196ceb-bd31-4937-82ef-a6896770c25e','Smartphone',900.00,1000.00,'Latest smartphone',10,1,1,'2025-12-09 13:27:48.590','2025-12-09 13:27:48.590','3d4ed51c-debd-4b11-8dea-6c06f7de1996');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerProfileId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reviews_customerProfileId_productId_key` (`customerProfileId`,`productId`),
  KEY `reviews_productId_fkey` (`productId`),
  CONSTRAINT `reviews_customerProfileId_fkey` FOREIGN KEY (`customerProfileId`) REFERENCES `CustomerProfile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES ('5c77ada3-886a-4b9b-86e0-909d3cf7a31b','b11bfcc4-de0c-43db-b5d7-55d96797c3c9','cf196ceb-bd31-4937-82ef-a6896770c25e',5,'Excellent!','2025-12-09 13:27:48.593','2025-12-09 13:27:48.593');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','CUSTOMER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CUSTOMER',
  `otp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiresAt` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `lastLogin` datetime(3) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('5ffe18b1-ac80-4325-a0f4-e0d905d1e1bf','customer@example.com','CUSTOMER',NULL,NULL,'2025-12-09 13:27:48.583','2025-12-09 13:27:48.583',NULL,1,NULL),('8be725f9-0a0c-419d-9b81-c19f91c870f7','devanandjoly@gmail.com','CUSTOMER','885588','2025-12-09 11:38:45.853','2025-11-21 08:13:04.729','2025-12-09 11:28:45.854',NULL,1,NULL),('8eea4373-3854-4579-8f80-04c88b2afb7a','admin1@gmail.com','ADMIN','196231','2025-12-09 12:17:08.805','2025-12-09 12:07:08.806','2025-12-09 12:07:08.806',NULL,0,NULL),('96a8b161-3ae8-41bc-a1c9-01940e3bd98e','admin@gmail.com','ADMIN','649775','2025-12-09 12:16:45.105','2025-12-09 11:45:52.511','2025-12-09 12:06:45.106',NULL,1,NULL),('d98c1ac3-bb5b-41d8-ad64-761f12a1e194','admin@example.com','ADMIN',NULL,NULL,'2025-12-09 13:27:48.581','2025-12-09 13:27:48.581',NULL,1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerProfileId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wishlist_customerProfileId_productId_key` (`customerProfileId`,`productId`),
  KEY `wishlist_productId_fkey` (`productId`),
  CONSTRAINT `wishlist_customerProfileId_fkey` FOREIGN KEY (`customerProfileId`) REFERENCES `CustomerProfile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `wishlist_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES ('51610f60-7e54-4356-b695-6aa3815841c6','b11bfcc4-de0c-43db-b5d7-55d96797c3c9','cf196ceb-bd31-4937-82ef-a6896770c25e','2025-12-09 13:27:48.613','2025-12-09 13:27:48.613');
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-09 18:59:35
