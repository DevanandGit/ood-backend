/*
  Warnings:

  - Added the required column `sizeId` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `sizeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `SizeAndQuantity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
