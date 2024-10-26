/*
  Warnings:

  - You are about to drop the column `data` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "data",
DROP COLUMN "priority",
ADD COLUMN     "colorSchemeId" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "ColorScheme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cardColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,

    CONSTRAINT "ColorScheme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ColorScheme_name_key" ON "ColorScheme"("name");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_colorSchemeId_fkey" FOREIGN KEY ("colorSchemeId") REFERENCES "ColorScheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
