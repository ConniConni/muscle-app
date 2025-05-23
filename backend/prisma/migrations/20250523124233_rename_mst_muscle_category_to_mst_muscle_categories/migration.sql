/*
  Warnings:

  - You are about to drop the `mst_muscle_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "muscle_training" DROP CONSTRAINT "muscle_training_category_id_fkey";

-- DropTable
DROP TABLE "mst_muscle_category";

-- CreateTable
CREATE TABLE "mst_muscle_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "mst_muscle_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "muscle_training" ADD CONSTRAINT "muscle_training_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "mst_muscle_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
