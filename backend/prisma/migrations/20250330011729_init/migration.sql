/*
  Warnings:

  - You are about to drop the column `mst_muscle_category_id` on the `muscle_training` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `muscle_training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "muscle_training" DROP COLUMN "mst_muscle_category_id",
ADD COLUMN     "category_id" INTEGER NOT NULL;
