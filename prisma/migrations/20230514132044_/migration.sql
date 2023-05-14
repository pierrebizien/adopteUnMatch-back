-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "player1" TEXT DEFAULT 'Player 1',
ADD COLUMN     "player2" TEXT DEFAULT 'Player 2',
ADD COLUMN     "player3" TEXT DEFAULT 'Player 3',
ADD COLUMN     "player4" TEXT DEFAULT 'Player 4',
ADD COLUMN     "player5" TEXT DEFAULT 'Player 5';

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "teamHomeId" INTEGER NOT NULL,
    "teamAwayId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamHomeId_fkey" FOREIGN KEY ("teamHomeId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamAwayId_fkey" FOREIGN KEY ("teamAwayId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
