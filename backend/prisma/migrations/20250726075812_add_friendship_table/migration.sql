-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- CreateTable
CREATE TABLE "friendships" (
    "requester_user_id" INTEGER NOT NULL,
    "approval_user_id" INTEGER NOT NULL,
    "status" "FriendshipStatus" NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "friendships_requester_user_id_approval_user_id_key" ON "friendships"("requester_user_id", "approval_user_id");

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_requester_user_id_fkey" FOREIGN KEY ("requester_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_approval_user_id_fkey" FOREIGN KEY ("approval_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
