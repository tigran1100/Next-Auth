-- AlterTable
ALTER TABLE `verificationtoken` MODIFY `email` VARCHAR(191) NULL,
    MODIFY `token` VARCHAR(191) NULL,
    MODIFY `expires` DATETIME(3) NULL;
