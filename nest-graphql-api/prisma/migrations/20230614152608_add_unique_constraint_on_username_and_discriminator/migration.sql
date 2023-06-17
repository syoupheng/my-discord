/*
  Warnings:

  - A unique constraint covering the columns `[username,discriminator]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discriminator` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "discriminator" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_discriminator_key" ON "users"("username", "discriminator");
