/*
  Warnings:

  - You are about to drop the column `category_id` on the `training_records` table. All the data in the column will be lost.
  - Added the required column `is_active` to the `exercise_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exercise_id` to the `training_records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "training_records" DROP CONSTRAINT "training_records_category_id_fkey";

-- DropIndex
DROP INDEX "training_records_category_id_idx";

-- AlterTable
ALTER TABLE "exercise_categories" ADD COLUMN     "is_active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "training_records" DROP COLUMN "category_id",
ADD COLUMN     "exercise_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TargetArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TargetArea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "training_records_exercise_id_idx" ON "training_records"("exercise_id");

-- AddForeignKey
ALTER TABLE "exercise_categories" ADD CONSTRAINT "exercise_categories_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "TargetArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_records" ADD CONSTRAINT "training_records_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
