-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemFamily" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "ItemFamily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "family_id" INTEGER,
    "measure_id" INTEGER,
    "barcode" VARCHAR(255),
    "price" INTEGER,
    "description" VARCHAR(255),
    "image_url" VARCHAR(255),
    "quantity" DECIMAL,
    "stock" DECIMAL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemFamily_Category" (
    "id" SERIAL NOT NULL,
    "item_family_id" INTEGER,
    "category_id" INTEGER,

    CONSTRAINT "ItemFamily_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item_Variant" (
    "id" SERIAL NOT NULL,
    "variant_id" INTEGER,
    "item_id" INTEGER,

    CONSTRAINT "Item_Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasureUnit" (
    "id" SERIAL NOT NULL,
    "measure" VARCHAR(255),

    CONSTRAINT "MeasureUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "password" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "VariantGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "variant_group_id" INTEGER,
    "name" VARCHAR(255),

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "ItemFamily"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_measure_id_fkey" FOREIGN KEY ("measure_id") REFERENCES "MeasureUnit"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ItemFamily_Category" ADD CONSTRAINT "ItemFamily_Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ItemFamily_Category" ADD CONSTRAINT "ItemFamily_Category_item_family_id_fkey" FOREIGN KEY ("item_family_id") REFERENCES "ItemFamily"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Item_Variant" ADD CONSTRAINT "Item_Variant_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Item_Variant" ADD CONSTRAINT "Item_Variant_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_variant_group_id_fkey" FOREIGN KEY ("variant_group_id") REFERENCES "VariantGroup"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
