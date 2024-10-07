-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "img" TEXT,
    "title" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "year" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
