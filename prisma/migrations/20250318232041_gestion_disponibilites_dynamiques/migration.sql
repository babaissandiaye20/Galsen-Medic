/*
  Warnings:

  - Added the required column `semaine` to the `Disponibilite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Disponibilite` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `dateModification` DATETIME(3) NULL,
    ADD COLUMN `pauseDebut` VARCHAR(191) NULL,
    ADD COLUMN `pauseFin` VARCHAR(191) NULL,
    ADD COLUMN `semaine` INTEGER NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
