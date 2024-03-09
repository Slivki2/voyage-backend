/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Guide` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Guide" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GuidePrimaryImages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GuideContentImages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CityToImages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CityToGuide" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CountryToImages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CountryToGuide" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuidePrimaryImages_AB_unique" ON "_GuidePrimaryImages"("A", "B");

-- CreateIndex
CREATE INDEX "_GuidePrimaryImages_B_index" ON "_GuidePrimaryImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuideContentImages_AB_unique" ON "_GuideContentImages"("A", "B");

-- CreateIndex
CREATE INDEX "_GuideContentImages_B_index" ON "_GuideContentImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CityToImages_AB_unique" ON "_CityToImages"("A", "B");

-- CreateIndex
CREATE INDEX "_CityToImages_B_index" ON "_CityToImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CityToGuide_AB_unique" ON "_CityToGuide"("A", "B");

-- CreateIndex
CREATE INDEX "_CityToGuide_B_index" ON "_CityToGuide"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToImages_AB_unique" ON "_CountryToImages"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToImages_B_index" ON "_CountryToImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToGuide_AB_unique" ON "_CountryToGuide"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToGuide_B_index" ON "_CountryToGuide"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Guide_name_key" ON "Guide"("name");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuidePrimaryImages" ADD CONSTRAINT "_GuidePrimaryImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuidePrimaryImages" ADD CONSTRAINT "_GuidePrimaryImages_B_fkey" FOREIGN KEY ("B") REFERENCES "Images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuideContentImages" ADD CONSTRAINT "_GuideContentImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuideContentImages" ADD CONSTRAINT "_GuideContentImages_B_fkey" FOREIGN KEY ("B") REFERENCES "Images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToImages" ADD CONSTRAINT "_CityToImages_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToImages" ADD CONSTRAINT "_CityToImages_B_fkey" FOREIGN KEY ("B") REFERENCES "Images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToGuide" ADD CONSTRAINT "_CityToGuide_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToGuide" ADD CONSTRAINT "_CityToGuide_B_fkey" FOREIGN KEY ("B") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToImages" ADD CONSTRAINT "_CountryToImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToImages" ADD CONSTRAINT "_CountryToImages_B_fkey" FOREIGN KEY ("B") REFERENCES "Images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToGuide" ADD CONSTRAINT "_CountryToGuide_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToGuide" ADD CONSTRAINT "_CountryToGuide_B_fkey" FOREIGN KEY ("B") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
