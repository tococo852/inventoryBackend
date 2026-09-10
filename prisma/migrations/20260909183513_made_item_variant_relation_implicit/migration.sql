/*
  Warnings:

  - You are about to drop the `Item_Variant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item_Variant" DROP CONSTRAINT "Item_Variant_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Item_Variant" DROP CONSTRAINT "Item_Variant_variant_id_fkey";

-- DropTable
DROP TABLE "Item_Variant";

-- CreateTable
CREATE TABLE "_ItemToVariant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ItemToVariant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemToVariant_B_index" ON "_ItemToVariant"("B");

-- AddForeignKey
ALTER TABLE "_ItemToVariant" ADD CONSTRAINT "_ItemToVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToVariant" ADD CONSTRAINT "_ItemToVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
