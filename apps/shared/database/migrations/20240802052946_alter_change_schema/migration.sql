/*
  Warnings:

  - You are about to drop the `project_payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "project_payment" DROP CONSTRAINT "project_payment_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "project_payment" DROP CONSTRAINT "project_payment_project_id_fkey";

-- DropTable
DROP TABLE "project_payment";

-- CreateTable
CREATE TABLE "subscription" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "expired" INTEGER NOT NULL,
    "payment_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "chanel" TEXT NOT NULL,
    "country_name" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "carrier_code" TEXT NOT NULL,
    "carrier_name" TEXT NOT NULL,
    "base" INTEGER NOT NULL,
    "free" INTEGER NOT NULL,
    "standard" INTEGER NOT NULL,
    "bussiness" INTEGER NOT NULL,
    "enterprise" INTEGER NOT NULL,

    CONSTRAINT "pricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_public_id_key" ON "subscription"("public_id");

-- CreateIndex
CREATE INDEX "subscription_public_id_project_id_idx" ON "subscription"("public_id", "project_id");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_public_id_key" ON "pricing"("public_id");

-- CreateIndex
CREATE INDEX "pricing_country_code_carrier_code_chanel_public_id_idx" ON "pricing"("country_code", "carrier_code", "chanel", "public_id");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
