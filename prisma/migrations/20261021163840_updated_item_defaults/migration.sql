/*
  Warnings:

  - Made the column `family_id` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "family_id" SET NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "stock" SET DEFAULT 0;
