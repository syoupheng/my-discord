/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `messages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "messages_createdAt_key" ON "messages"("createdAt");
