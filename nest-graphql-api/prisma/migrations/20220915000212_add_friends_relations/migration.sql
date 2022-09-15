-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('FRIENDS', 'BLOCKED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "friend_requests" (
    "senderId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friend_requests_pkey" PRIMARY KEY ("senderId","recipientId")
);

-- CreateTable
CREATE TABLE "friends_with" (
    "isFriendsWithId" INTEGER NOT NULL,
    "hasFriendsId" INTEGER NOT NULL,
    "status" "FriendStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friends_with_pkey" PRIMARY KEY ("isFriendsWithId","hasFriendsId")
);

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends_with" ADD CONSTRAINT "friends_with_isFriendsWithId_fkey" FOREIGN KEY ("isFriendsWithId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends_with" ADD CONSTRAINT "friends_with_hasFriendsId_fkey" FOREIGN KEY ("hasFriendsId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
