/*
  Warnings:

  - A unique constraint covering the columns `[cardColor,textColor]` on the table `ColorScheme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ColorScheme_cardColor_textColor_key" ON "ColorScheme"("cardColor", "textColor");
