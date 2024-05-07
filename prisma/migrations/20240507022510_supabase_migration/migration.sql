-- CreateTable
CREATE TABLE "thoughts" (
    "id" SERIAL NOT NULL,
    "byUsername" VARCHAR(16) NOT NULL,
    "content" VARCHAR(640) NOT NULL,
    "feeling" TEXT NOT NULL,
    "cs50year" TEXT NOT NULL DEFAULT '2022',
    "upVotes" INTEGER DEFAULT 0,
    "DownVotes" INTEGER DEFAULT 0,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "thoughts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "thoughts_id_key" ON "thoughts"("id");
