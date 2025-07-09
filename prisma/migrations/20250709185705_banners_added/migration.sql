-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isOnDisplay" BOOLEAN NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);
