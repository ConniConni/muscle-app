-- AlterTable
ALTER TABLE "friendships" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "friendships_pkey" PRIMARY KEY ("id");
