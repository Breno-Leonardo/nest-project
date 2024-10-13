import { PrismaClient } from '@prisma/client';
import { encrypt } from '../../src/utils/utils';
const prisma = new PrismaClient();

async function seed() {
  console.log('Starting Farm seed');
  const farmData = [
    {
      id: '1a2b3c4d-5678-90ab-cdef-1234567890ab',
      producerId: 'f6d9cb09-1220-4cac-86b7-2739e7a5a243',
      cnpj: encrypt('12345678000100', process.env.ENCRYPT_KEY),
      name: 'Fazenda Alagoinhas',
      city: 'Alagoinhas',
      state: 'Bahia',
      totalArea: 1000.0,
      agriculturalArea: 800.0,
      vegetationArea: 200.0,
    },
    {
      id: '2b3c4d5e-6789-01bc-def2-3456789012cd',
      producerId: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
      cnpj: encrypt('23456789000111', process.env.ENCRYPT_KEY),
      name: 'Fazenda Curitiba',
      city: 'Curitiba',
      state: 'Paraná',
      totalArea: 1500.0,
      agriculturalArea: 1200.0,
      vegetationArea: 300.0,
    },
    {
      id: '3c4d5e6f-7890-12cd-ef34-5678901234de',
      producerId: 'b2c3d4e5-6789-01bc-def2-3456789012cd',
      cnpj: encrypt('34567890000122', process.env.ENCRYPT_KEY),
      name: 'Fazenda Manaus',
      city: 'Manaus',
      state: 'Amazonas',
      totalArea: 2000.0,
      agriculturalArea: 1500.0,
      vegetationArea: 500.0,
    },
    {
      id: '4d5e6f7g-8901-23de-f456-7890123456ef',
      producerId: 'c3d4e5f6-7890-12cd-ef34-5678901234de',
      cnpj: encrypt('45678900000133', process.env.ENCRYPT_KEY),
      name: 'Fazenda Recife',
      city: 'Recife',
      state: 'Pernambuco',
      totalArea: 1800.0,
      agriculturalArea: 1300.0,
      vegetationArea: 500.0,
    },
    {
      id: '5e6f7g8h-9012-34ef-5678-9012345678gh',
      producerId: 'd4e5f6g7-8901-23de-f456-7890123456ef',
      cnpj: encrypt('56789000000144', process.env.ENCRYPT_KEY),
      name: 'Fazenda Porto Alegre',
      city: 'Porto Alegre',
      state: 'Rio Grande do Sul',
      totalArea: 2200.0,
      agriculturalArea: 1700.0,
      vegetationArea: 500.0,
    },
    {
      id: '6f7g8h9i-0123-45fg-6789-0123456789hi',
      producerId: 'e5f6g7h8-9012-34ef-5678-9012345678gh',
      cnpj: encrypt('67890000000155', process.env.ENCRYPT_KEY),
      name: 'Fazenda São Paulo',
      city: 'São Paulo',
      state: 'São Paulo',
      totalArea: 2500.0,
      agriculturalArea: 2000.0,
      vegetationArea: 500.0,
    },
    {
      id: '7g8h9i0j-1234-56gh-7890-1234567890ij',
      producerId: 'f6g7h8i9-0123-45fg-6789-0123456789hi',
      cnpj: encrypt('78900000000166', process.env.ENCRYPT_KEY),
      name: 'Fazenda Rio de Janeiro',
      city: 'Rio de Janeiro',
      state: 'Rio de Janeiro',
      totalArea: 2700.0,
      agriculturalArea: 2200.0,
      vegetationArea: 500.0,
    },
    {
      id: '8h9i0j1k-2345-67hi-8901-2345678901jk',
      producerId: 'g7h8i9j0-1234-56gh-7890-1234567890ij',
      cnpj: encrypt('89000000000177', process.env.ENCRYPT_KEY),
      name: 'Fazenda Belo Horizonte',
      city: 'Belo Horizonte',
      state: 'Minas Gerais',
      totalArea: 3000.0,
      agriculturalArea: 2500.0,
      vegetationArea: 500.0,
    },
    {
      id: '9i0j1k2l-3456-78ij-9012-3456789012kl',
      producerId: 'h8i9j0k1-2345-67hi-8901-2345678901jk',
      cnpj: encrypt('90000000000188', process.env.ENCRYPT_KEY),
      name: 'Fazenda Fortaleza',
      city: 'Fortaleza',
      state: 'Ceará',
      totalArea: 3200.0,
      agriculturalArea: 2700.0,
      vegetationArea: 500.0,
    },
    {
      id: '0j1k2l3m-4567-89jk-0123-4567890123lm',
      producerId: 'i9j0k1l2-3456-78ij-9012-3456789012kl',
      cnpj: encrypt('00000000000199', process.env.ENCRYPT_KEY),
      name: 'Fazenda Florianópolis',
      city: 'Florianópolis',
      state: 'Santa Catarina',
      totalArea: 3500.0,
      agriculturalArea: 3000.0,
      vegetationArea: 500.0,
    },
  ];

  await prisma.farm.createMany({
    data: farmData,
  });

  console.log('Farms inserted successfully');
}

const load = async () => {
  try {
    await seed();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
