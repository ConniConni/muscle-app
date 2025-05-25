-- AlterTable
ALTER TABLE "exercise_categories" ALTER COLUMN "create_date" DROP DEFAULT,
ALTER COLUMN "update_date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "target_areas" ALTER COLUMN "create_date" DROP DEFAULT,
ALTER COLUMN "update_date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "training_records" ALTER COLUMN "create_date" DROP DEFAULT,
ALTER COLUMN "update_date" DROP DEFAULT;
