/*
  Warnings:

  - A unique constraint covering the columns `[mercadoPagoId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Purchase_mercadoPagoId_key" ON "Purchase"("mercadoPagoId");
