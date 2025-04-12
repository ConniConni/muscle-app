-- AddForeignKey
ALTER TABLE "muscle_training" ADD CONSTRAINT "muscle_training_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "mst_muscle_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
