-- CreateTable
CREATE TABLE "MentionsOnMessages" (
    "messageId" INTEGER NOT NULL,
    "mentionId" INTEGER NOT NULL,

    CONSTRAINT "MentionsOnMessages_pkey" PRIMARY KEY ("messageId","mentionId")
);

-- AddForeignKey
ALTER TABLE "MentionsOnMessages" ADD CONSTRAINT "MentionsOnMessages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentionsOnMessages" ADD CONSTRAINT "MentionsOnMessages_mentionId_fkey" FOREIGN KEY ("mentionId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
