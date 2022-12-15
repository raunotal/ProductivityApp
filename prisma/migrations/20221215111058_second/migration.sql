/*
  Warnings:

  - Made the column `end` on table `TodoLog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `TodoLog` MODIFY `end` DATETIME(3) NOT NULL;
