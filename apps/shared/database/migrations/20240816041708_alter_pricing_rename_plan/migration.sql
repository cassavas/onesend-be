/*
  Warnings:

  - Added the required column `carrier` to the `otp_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `otp_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "otp_history" ADD COLUMN     "carrier" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "pricing" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "pricing" ADD COLUMN     "business" INTEGER,
ALTER COLUMN "bussiness" DROP NOT NULL;
