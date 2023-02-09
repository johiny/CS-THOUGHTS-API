/*
  Warnings:

  - You are about to alter the column `byUsername` on the `thoughts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(16)`.

*/
-- AlterTable
ALTER TABLE `thoughts` MODIFY `byUsername` VARCHAR(16) NOT NULL,
    MODIFY `content` VARCHAR(640) NOT NULL;
