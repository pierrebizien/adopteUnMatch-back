-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_teamAwayId_fkey";

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "teamAwayId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamAwayId_fkey" FOREIGN KEY ("teamAwayId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
