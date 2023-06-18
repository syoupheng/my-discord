/*
  Warnings:

  - Added the required column `hidden` to the `members_in_channels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members_in_channels" ADD COLUMN     "hidden" BOOLEAN NOT NULL;
