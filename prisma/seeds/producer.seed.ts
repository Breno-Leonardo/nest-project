import { PrismaClient } from '@prisma/client';
import { encrypt } from '../../src/utils/utils';

const prisma = new PrismaClient();

async function seed() {
  console.log('Starting Producer seed');
  const producerData = [
    {
      id: 'f6d9cb09-1220-4cac-86b7-2739e7a5a243',
      name: 'Breno Leonardo',
      cpf: encrypt('12345678900', process.env.ENCRYPT_KEY),
      city: 'Alagoinhas',
      state: 'Bahia',
    },
    {
      id: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
      name: 'Ana Maria',
      cpf: encrypt('98765432100', process.env.ENCRYPT_KEY),
      city: 'Curitiba',
      state: 'Paraná',
    },
    {
      id: 'b2c3d4e5-6789-01bc-def2-3456789012cd',
      name: 'Carlos Silva',
      cpf: encrypt('11223344556', process.env.ENCRYPT_KEY),
      city: 'Manaus',
      state: 'Amazonas',
    },
    {
      id: 'c3d4e5f6-7890-12cd-ef34-5678901234de',
      name: 'Daniela Souza',
      cpf: encrypt('22334455667', process.env.ENCRYPT_KEY),
      city: 'Recife',
      state: 'Pernambuco',
    },
    {
      id: 'd4e5f6g7-8901-23de-f456-7890123456ef',
      name: 'Eduardo Pereira',
      cpf: encrypt('33445566778', process.env.ENCRYPT_KEY),
      city: 'Porto Alegre',
      state: 'Rio Grande do Sul',
    },
    {
      id: 'e5f6g7h8-9012-34ef-5678-9012345678gh',
      name: 'Fernanda Lima',
      cpf: encrypt('44556677889', process.env.ENCRYPT_KEY),
      city: 'São Paulo',
      state: 'São Paulo',
    },
    {
      id: 'f6g7h8i9-0123-45fg-6789-0123456789hi',
      name: 'Gabriel Santos',
      cpf: encrypt('55667788990', process.env.ENCRYPT_KEY),
      city: 'Rio de Janeiro',
      state: 'Rio de Janeiro',
    },
    {
      id: 'g7h8i9j0-1234-56gh-7890-1234567890ij',
      name: 'Helena Costa',
      cpf: encrypt('66778899001', process.env.ENCRYPT_KEY),
      city: 'Belo Horizonte',
      state: 'Minas Gerais',
    },
    {
      id: 'h8i9j0k1-2345-67hi-8901-2345678901jk',
      name: 'Igor Almeida',
      cpf: encrypt('77889900112', process.env.ENCRYPT_KEY),
      city: 'Fortaleza',
      state: 'Ceará',
    },
    {
      id: 'i9j0k1l2-3456-78ij-9012-3456789012kl',
      name: 'Juliana Rocha',
      cpf: encrypt('88990011223', process.env.ENCRYPT_KEY),
      city: 'Florianópolis',
      state: 'Santa Catarina',
    },
  ];

  await prisma.producer.createMany({
    data: producerData,
  });

  console.log('Producers inserted successfully');
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
