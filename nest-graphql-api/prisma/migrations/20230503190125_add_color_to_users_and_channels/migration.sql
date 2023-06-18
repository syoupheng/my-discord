-- AlterTable
ALTER TABLE "channels" ADD COLUMN     "avatarColor" TEXT NOT NULL DEFAULT '#45c46d';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatarColor" TEXT NOT NULL DEFAULT '#ef4444';
