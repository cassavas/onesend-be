-- CreateTable
CREATE TABLE "otp_history" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "otp" TEXT NOT NULL,
    "message" TEXT,

    CONSTRAINT "otp_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otp_history_public_id_key" ON "otp_history"("public_id");

-- CreateIndex
CREATE INDEX "otp_history_id_public_id_idx" ON "otp_history"("id", "public_id");

-- AddForeignKey
ALTER TABLE "otp_history" ADD CONSTRAINT "otp_history_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "otp_history" ADD CONSTRAINT "otp_history_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
