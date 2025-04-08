/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `BlacklistedToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `BlacklistedToken_token_key` ON `BlacklistedToken`(`token`);
