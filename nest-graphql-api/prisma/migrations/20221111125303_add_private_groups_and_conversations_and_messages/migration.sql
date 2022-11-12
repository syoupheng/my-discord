-- CreateTable
CREATE TABLE "private_group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "private_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members_in_private_groups" (
    "privateGroupId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "joinedIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "members_in_private_groups_pkey" PRIMARY KEY ("privateGroupId","memberId")
);

-- CreateTable
CREATE TABLE "group_message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "privateGroupId" INTEGER NOT NULL,
    "respondsToId" INTEGER,

    CONSTRAINT "group_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "private_conversation" (
    "id" SERIAL NOT NULL,
    "friend_1_id" INTEGER NOT NULL,
    "friend_2_id" INTEGER NOT NULL,
    "display1" BOOLEAN NOT NULL DEFAULT true,
    "display2" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "private_conversation_pkey" PRIMARY KEY ("friend_1_id","friend_2_id")
);

-- CreateTable
CREATE TABLE "conversation_message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "privateConversationId" INTEGER NOT NULL,
    "respondsToId" INTEGER,

    CONSTRAINT "conversation_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "private_conversation_id_key" ON "private_conversation"("id");

-- AddForeignKey
ALTER TABLE "members_in_private_groups" ADD CONSTRAINT "members_in_private_groups_privateGroupId_fkey" FOREIGN KEY ("privateGroupId") REFERENCES "private_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_in_private_groups" ADD CONSTRAINT "members_in_private_groups_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_message" ADD CONSTRAINT "group_message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_message" ADD CONSTRAINT "group_message_privateGroupId_fkey" FOREIGN KEY ("privateGroupId") REFERENCES "private_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_message" ADD CONSTRAINT "group_message_respondsToId_fkey" FOREIGN KEY ("respondsToId") REFERENCES "group_message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private_conversation" ADD CONSTRAINT "private_conversation_friend_1_id_fkey" FOREIGN KEY ("friend_1_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private_conversation" ADD CONSTRAINT "private_conversation_friend_2_id_fkey" FOREIGN KEY ("friend_2_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_message" ADD CONSTRAINT "conversation_message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_message" ADD CONSTRAINT "conversation_message_privateConversationId_fkey" FOREIGN KEY ("privateConversationId") REFERENCES "private_conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_message" ADD CONSTRAINT "conversation_message_respondsToId_fkey" FOREIGN KEY ("respondsToId") REFERENCES "conversation_message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
