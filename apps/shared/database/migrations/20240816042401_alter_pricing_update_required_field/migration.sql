/*
  Warnings:

  - Made the column `business` on table `pricing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pricing" ALTER COLUMN "business" SET NOT NULL;
