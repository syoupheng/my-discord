-- DropForeignKey
ALTER TABLE "mentions_on_messages" DROP CONSTRAINT "mentions_on_messages_messageId_fkey";

-- AddForeignKey
ALTER TABLE "mentions_on_messages" ADD CONSTRAINT "mentions_on_messages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
