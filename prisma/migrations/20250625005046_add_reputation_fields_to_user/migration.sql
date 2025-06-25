-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dislikesReceived" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likesReceived" INTEGER NOT NULL DEFAULT 0;
