-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT,
    "address" TEXT,
    "active" BOOLEAN NOT NULL,
    "password" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_token" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "meta" JSONB,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "auth_id" TEXT NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_public_id_key" ON "user"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_public_id_email_idx" ON "user"("public_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_public_id_key" ON "user_token"("public_id");

-- CreateIndex
CREATE INDEX "user_token_user_id_token_idx" ON "user_token"("user_id", "token");

-- CreateIndex
CREATE UNIQUE INDEX "project_public_id_key" ON "project"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_name_key" ON "project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "project_sid_key" ON "project"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "project_auth_id_key" ON "project"("auth_id");

-- CreateIndex
CREATE INDEX "project_sid_public_id_idx" ON "project"("sid", "public_id");

-- CreateIndex
CREATE UNIQUE INDEX "plan_public_id_key" ON "plan"("public_id");

-- CreateIndex
CREATE INDEX "plan_public_id_idx" ON "plan"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "service_public_id_key" ON "service"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "service_sid_key" ON "service"("sid");

-- CreateIndex
CREATE INDEX "service_sid_public_id_idx" ON "service"("sid", "public_id");

-- AddForeignKey
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
