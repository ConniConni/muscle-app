/*
  Warnings:

  - You are about to drop the `mst_muscle_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `muscle_training` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "muscle_training" DROP CONSTRAINT "muscle_training_category_id_fkey";

-- DropTable
DROP TABLE "mst_muscle_categories";

-- DropTable
DROP TABLE "muscle_training";

-- CreateTable
CREATE TABLE "exercise_categories" (
    "id" SERIAL NOT NULL,
    "target_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "exercise_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_records" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "weight" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "training_records_category_id_idx" ON "training_records"("category_id");

-- AddForeignKey
ALTER TABLE "training_records" ADD CONSTRAINT "training_records_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "exercise_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
