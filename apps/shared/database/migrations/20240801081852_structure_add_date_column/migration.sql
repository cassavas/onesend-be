-- AlterTable
ALTER TABLE "plan" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "message_commited" INTEGER;

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "service" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "project_payment" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "expired" INTEGER NOT NULL,
    "payment_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_payment_public_id_key" ON "project_payment"("public_id");

-- CreateIndex
CREATE INDEX "project_payment_public_id_project_id_idx" ON "project_payment"("public_id", "project_id");

-- AddForeignKey
ALTER TABLE "project_payment" ADD CONSTRAINT "project_payment_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "project_payment" ADD CONSTRAINT "project_payment_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
