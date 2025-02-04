-- CreateTable
CREATE TABLE `new_finance_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `revenue` INTEGER NOT NULL,
    `expenses` INTEGER NOT NULL,
    `profit` INTEGER NOT NULL,
    `customerCount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
