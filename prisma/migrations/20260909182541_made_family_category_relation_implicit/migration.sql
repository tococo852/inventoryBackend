/*
  Warnings:

  - You are about to drop the `ItemFamily_Category` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `variant_id` on table `Item_Variant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `item_id` on table `Item_Variant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `variant_group_id` on table `Variant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_family_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemFamily_Category" DROP CONSTRAINT "ItemFamily_Category_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemFamily_Category" DROP CONSTRAINT "ItemFamily_Category_item_family_id_fkey";

-- AlterTable
ALTER TABLE "Item_Variant" ALTER COLUMN "variant_id" SET NOT NULL,
ALTER COLUMN "item_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;

-- AlterTable
ALTER TABLE "Variant" ALTER COLUMN "variant_group_id" SET NOT NULL;

-- DropTable
DROP TABLE "ItemFamily_Category";

-- CreateTable
CREATE TABLE "_CategoryToItemFamily" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryToItemFamily_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToItemFamily_B_index" ON "_CategoryToItemFamily"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "ItemFamily"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_CategoryToItemFamily" ADD CONSTRAINT "_CategoryToItemFamily_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToItemFamily" ADD CONSTRAINT "_CategoryToItemFamily_B_fkey" FOREIGN KEY ("B") REFERENCES "ItemFamily"("id") ON DELETE CASCADE ON UPDATE CASCADE;
