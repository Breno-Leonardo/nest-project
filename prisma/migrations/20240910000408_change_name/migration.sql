/*
  Warnings:

  - You are about to drop the `CropsPlanted` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Farm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Login` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CropsPlanted" DROP CONSTRAINT "CropsPlanted_farmId_fkey";

-- DropForeignKey
ALTER TABLE "Farm" DROP CONSTRAINT "Farm_producerId_fkey";

-- DropTable
DROP TABLE "CropsPlanted";

-- DropTable
DROP TABLE "Farm";

-- DropTable
DROP TABLE "Login";

-- DropTable
DROP TABLE "Producer";

-- CreateTable
CREATE TABLE "login" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farm" (
    "id" TEXT NOT NULL,
    "producerId" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "agriculturalArea" DOUBLE PRECISION NOT NULL,
    "vegetationArea" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops_planted" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "crop" "CROPS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crops_planted_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "farm" ADD CONSTRAINT "farm_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crops_planted" ADD CONSTRAINT "crops_planted_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
