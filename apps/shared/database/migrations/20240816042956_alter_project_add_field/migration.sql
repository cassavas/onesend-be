-- AlterTable
ALTER TABLE "project" ADD COLUMN     "email_commited" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sms_commited" INTEGER NOT NULL DEFAULT 0;
