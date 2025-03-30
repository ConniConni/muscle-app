-- CreateTable
CREATE TABLE "mst_muscle_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "mst_muscle_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muscle_training" (
    "id" SERIAL NOT NULL,
    "mst_muscle_category_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,
    "update_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "muscle_training_pkey" PRIMARY KEY ("id")
);
