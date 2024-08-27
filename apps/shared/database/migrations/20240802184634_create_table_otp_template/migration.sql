-- CreateTable
CREATE TABLE "otp_template" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "project_id" INTEGER,
    "orgin" TEXT NOT NULL,
    "unicode" TEXT NOT NULL,
    "en" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "otp_template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otp_template_public_id_key" ON "otp_template"("public_id");

-- CreateIndex
CREATE INDEX "otp_template_id_public_id_idx" ON "otp_template"("id", "public_id");

-- AddForeignKey
ALTER TABLE "otp_template" ADD CONSTRAINT "otp_template_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
