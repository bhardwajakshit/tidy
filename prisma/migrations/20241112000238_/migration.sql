/*
  Warnings:

  - You are about to drop the column `name` on the `ColorScheme` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ColorScheme_name_key";

-- AlterTable
ALTER TABLE "ColorScheme" DROP COLUMN "name";
