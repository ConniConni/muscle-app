/*
  Warnings:

  - You are about to drop the `ApprovalFriendStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_status_fkey";

-- DropTable
DROP TABLE "ApprovalFriendStatus";

-- CreateTable
CREATE TABLE "approval_friend_statuses" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "approval_friend_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_status_fkey" FOREIGN KEY ("status") REFERENCES "approval_friend_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
