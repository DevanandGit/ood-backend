/*
  Warnings:

  - You are about to drop the column `is_verified` on the `verifiedOrNot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `verifiedOrNot` DROP COLUMN `is_verified`;
