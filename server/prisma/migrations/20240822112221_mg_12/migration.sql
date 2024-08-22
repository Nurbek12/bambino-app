/*
  Warnings:

  - Added the required column `reports` to the `Statistics` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Statistics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "orders" INTEGER NOT NULL,
    "users" INTEGER NOT NULL,
    "reports" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Statistics" ("amount", "created_at", "date", "day", "id", "month", "orders", "updated_at", "users", "year") SELECT "amount", "created_at", "date", "day", "id", "month", "orders", "updated_at", "users", "year" FROM "Statistics";
DROP TABLE "Statistics";
ALTER TABLE "new_Statistics" RENAME TO "Statistics";
CREATE UNIQUE INDEX "Statistics_date_key" ON "Statistics"("date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
