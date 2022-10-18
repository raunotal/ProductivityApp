-- CreateTable
CREATE TABLE `ToDo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) NOT NULL,
    `totalTime` INTEGER NOT NULL,
    `progressInSeconds` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
