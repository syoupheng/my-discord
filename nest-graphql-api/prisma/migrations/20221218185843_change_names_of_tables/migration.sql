/*
  Warnings:

  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MentionsOnMessages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MentionsOnMessages" DROP CONSTRAINT "MentionsOnMessages_mentionId_fkey";

-- DropForeignKey
ALTER TABLE "MentionsOnMessages" DROP CONSTRAINT "MentionsOnMessages_messageId_fkey";

-- DropForeignKey
ALTER TABLE "members_in_channels" DROP CONSTRAINT "members_in_channels_channelId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_authorId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_channelId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_respondsToId_fkey";

-- DropTable
DROP TABLE "Channel";

-- DropTable
DROP TABLE "MentionsOnMessages";

-- DropTable
DROP TABLE "message";

-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ChannelType" NOT NULL DEFAULT 'PRIVATE_CONVERSATION',

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,
    "respondsToId" INTEGER,
    "type" "MessageType" NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentions_on_messages" (
    "messageId" INTEGER NOT NULL,
    "mentionId" INTEGER NOT NULL,

    CONSTRAINT "mentions_on_messages_pkey" PRIMARY KEY ("messageId","mentionId")
);

-- AddForeignKey
ALTER TABLE "members_in_channels" ADD CONSTRAINT "members_in_channels_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_respondsToId_fkey" FOREIGN KEY ("respondsToId") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentions_on_messages" ADD CONSTRAINT "mentions_on_messages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentions_on_messages" ADD CONSTRAINT "mentions_on_messages_mentionId_fkey" FOREIGN KEY ("mentionId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
