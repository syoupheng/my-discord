/*
  Warnings:

  - You are about to drop the `conversation_message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `group_message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "conversation_message" DROP CONSTRAINT "conversation_message_authorId_fkey";

-- DropForeignKey
ALTER TABLE "conversation_message" DROP CONSTRAINT "conversation_message_privateConversationId_fkey";

-- DropForeignKey
ALTER TABLE "conversation_message" DROP CONSTRAINT "conversation_message_respondsToId_fkey";

-- DropForeignKey
ALTER TABLE "group_message" DROP CONSTRAINT "group_message_authorId_fkey";

-- DropForeignKey
ALTER TABLE "group_message" DROP CONSTRAINT "group_message_privateGroupId_fkey";

-- DropForeignKey
ALTER TABLE "group_message" DROP CONSTRAINT "group_message_respondsToId_fkey";

-- DropTable
DROP TABLE "conversation_message";

-- DropTable
DROP TABLE "group_message";

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "privateGroupId" INTEGER,
    "privateConversationId" INTEGER,
    "respondsToId" INTEGER,
    "type" INTEGER NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_privateGroupId_fkey" FOREIGN KEY ("privateGroupId") REFERENCES "private_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_privateConversationId_fkey" FOREIGN KEY ("privateConversationId") REFERENCES "private_conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_respondsToId_fkey" FOREIGN KEY ("respondsToId") REFERENCES "message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
