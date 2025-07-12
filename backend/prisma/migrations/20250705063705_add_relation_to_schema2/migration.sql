/*
  Warnings:

  - Made the column `user_id` on table `training_records` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "training_records" ALTER COLUMN "user_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "training_records_user_id_idx" ON "training_records"("user_id");

-- AddForeignKey
ALTER TABLE "training_records" ADD CONSTRAINT "training_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
