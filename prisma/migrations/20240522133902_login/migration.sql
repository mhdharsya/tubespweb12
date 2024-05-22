-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(256) NOT NULL,
    `password` VARCHAR(256) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `token` (
    `id_token` INTEGER NOT NULL AUTO_INCREMENT,
    `token` TEXT NOT NULL,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expired` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id_token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
