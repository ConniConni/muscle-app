/*
  Warnings:

  - Changed the type of `status` on the `friendships` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "friendships" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "FriendshipStatus";

-- CreateTable
CREATE TABLE "ApprovalFriendStatus" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ApprovalFriendStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_status_fkey" FOREIGN KEY ("status") REFERENCES "ApprovalFriendStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
