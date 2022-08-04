-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Thought" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "byUsername" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "feeling" TEXT NOT NULL,
    "upVotes" INTEGER DEFAULT 0,
    "DownVotes" INTEGER DEFAULT 0,
    "createdDate" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Thought" ("DownVotes", "byUsername", "content", "createdDate", "feeling", "id", "upVotes") SELECT "DownVotes", "byUsername", "content", "createdDate", "feeling", "id", "upVotes" FROM "Thought";
DROP TABLE "Thought";
ALTER TABLE "new_Thought" RENAME TO "Thought";
CREATE UNIQUE INDEX "Thought_id_key" ON "Thought"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
