-- CreateTable
CREATE TABLE "Thought" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "byUsername" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "feeling" TEXT NOT NULL,
    "upVotes" INTEGER NOT NULL,
    "DownVotes" INTEGER NOT NULL,
    "createdDate" DATETIME NOT NULL
);
