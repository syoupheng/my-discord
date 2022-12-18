/*
  Warnings:

  - You are about to drop the column `privateConversationId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `privateGroupId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the `members_in_private_groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `private_conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `private_group` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channelId` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('PRIVATE_CONVERSATION', 'PRIVATE_GROUP');

-- DropForeignKey
ALTER TABLE "members_in_private_groups" DROP CONSTRAINT "members_in_private_groups_memberId_fkey";

-- DropForeignKey
ALTER TABLE "members_in_private_groups" DROP CONSTRAINT "members_in_private_groups_privateGroupId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_privateConversationId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_privateGroupId_fkey";

-- DropForeignKey
ALTER TABLE "private_conversation" DROP CONSTRAINT "private_conversation_friend_1_id_fkey";

-- DropForeignKey
ALTER TABLE "private_conversation" DROP CONSTRAINT "private_conversation_friend_2_id_fkey";

-- AlterTable
ALTER TABLE "message" DROP COLUMN "privateConversationId",
DROP COLUMN "privateGroupId",
ADD COLUMN     "channelId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "members_in_private_groups";

-- DropTable
DROP TABLE "private_conversation";

-- DropTable
DROP TABLE "private_group";

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ChannelType" NOT NULL DEFAULT 'PRIVATE_CONVERSATION',

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members_in_channels" (
    "channelId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "joinedIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "members_in_channels_pkey" PRIMARY KEY ("channelId","memberId")
);

-- AddForeignKey
ALTER TABLE "members_in_channels" ADD CONSTRAINT "members_in_channels_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_in_channels" ADD CONSTRAINT "members_in_channels_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
