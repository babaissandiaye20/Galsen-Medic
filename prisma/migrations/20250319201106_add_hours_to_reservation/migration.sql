/*
  Warnings:

  - Added the required column `heureDebut` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heureFin` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `heureDebut` VARCHAR(191) NOT NULL,
    ADD COLUMN `heureFin` VARCHAR(191) NOT NULL;
