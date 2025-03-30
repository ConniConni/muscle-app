/*
  Warnings:

  - Added the required column `name` to the `mst_muscle_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mst_muscle_category" ADD COLUMN     "name" TEXT NOT NULL;
