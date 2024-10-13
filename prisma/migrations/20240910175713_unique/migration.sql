/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `farm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[login]` on the table `login` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `producer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "farm_cnpj_key" ON "farm"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "login_login_key" ON "login"("login");

-- CreateIndex
CREATE UNIQUE INDEX "producer_cpf_key" ON "producer"("cpf");
