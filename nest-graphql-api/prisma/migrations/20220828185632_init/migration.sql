-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ONLINE', 'INACTIVE', 'DO_NOT_DISTURB', 'INVISIBLE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'INVISIBLE',
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
