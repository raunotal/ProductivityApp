-- CreateTable
CREATE TABLE `ToDo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) NOT NULL,
    `totalTimeInSeconds` INTEGER NOT NULL,
    `userId` VARCHAR(256) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TodoLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `toDoId` INTEGER NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TodoLog` ADD CONSTRAINT `TodoLog_toDoId_fkey` FOREIGN KEY (`toDoId`) REFERENCES `ToDo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
