/*
  Warnings:

  - You are about to alter the column `emailVerified` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `emailVerified` BOOLEAN NULL DEFAULT false;
