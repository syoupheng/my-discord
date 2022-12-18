/*
  Warnings:

  - Changed the type of `type` on the `message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('NORMAL', 'NAME_CHANGE_NOTIFICATION', 'ARRIVAL_NOTIFICATION', 'LEAVE_NOTIFICATION');

-- AlterTable
ALTER TABLE "message" DROP COLUMN "type",
ADD COLUMN     "type" "MessageType" NOT NULL;
