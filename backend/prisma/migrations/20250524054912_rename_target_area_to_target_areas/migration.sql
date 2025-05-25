/*
  Warnings:

  - You are about to drop the `TargetArea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercise_categories" DROP CONSTRAINT "exercise_categories_target_id_fkey";

-- DropTable
DROP TABLE "TargetArea";

-- CreateTable
CREATE TABLE "target_areas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "target_areas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercise_categories" ADD CONSTRAINT "exercise_categories_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "target_areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
