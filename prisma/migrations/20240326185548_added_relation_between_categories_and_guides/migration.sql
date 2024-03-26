-- CreateTable
CREATE TABLE "_GuideToGuideCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuideToGuideCategory_AB_unique" ON "_GuideToGuideCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_GuideToGuideCategory_B_index" ON "_GuideToGuideCategory"("B");

-- AddForeignKey
ALTER TABLE "_GuideToGuideCategory" ADD CONSTRAINT "_GuideToGuideCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuideToGuideCategory" ADD CONSTRAINT "_GuideToGuideCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "GuideCategory"("key") ON DELETE CASCADE ON UPDATE CASCADE;
