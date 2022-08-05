/*
  Warnings:

  - You are about to drop the `Thought` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Thought`;

-- CreateTable
CREATE TABLE `Thoughts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `byUsername` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `feeling` VARCHAR(191) NOT NULL,
    `upVotes` INTEGER NULL DEFAULT 0,
    `DownVotes` INTEGER NULL DEFAULT 0,
    `createdDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Thoughts_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
