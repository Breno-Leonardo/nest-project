import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function seed() {
  console.log('Starting Login seed');
  const loginData = [
    {
      login: 'adm',
      password:bcrypt.hashSync('adm', bcrypt.genSaltSync())
    },
  ];

  await prisma.login.createMany({
    data: loginData,
  });

  console.log('Login inserted successfully');
}

const load = async () => {
  try {
    seed();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
