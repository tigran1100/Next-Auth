/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `verificationtoken` ADD COLUMN `code` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `VerificationToken_code_key` ON `VerificationToken`(`code`);
