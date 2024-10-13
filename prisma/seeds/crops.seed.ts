import { PrismaClient, CROPS } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  console.log('Starting CropsPlanted seed');
  const cropsPlantedData = [
    {
      farmId: '1a2b3c4d-5678-90ab-cdef-1234567890ab',
      crop: CROPS.SOYBEANS,
    },
    {
      farmId: '2b3c4d5e-6789-01bc-def2-3456789012cd',
      crop: CROPS.CORN,
    },
    {
      farmId: '3c4d5e6f-7890-12cd-ef34-5678901234de',
      crop: CROPS.COTTON,
    },
    {
      farmId: '4d5e6f7g-8901-23de-f456-7890123456ef',
      crop: CROPS.COFFEE,
    },
    {
      farmId: '5e6f7g8h-9012-34ef-5678-9012345678gh',
      crop: CROPS.SUGAR_CANE,
    },
    {
      farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
      crop: CROPS.SOYBEANS,
    },
    {
      farmId: '7g8h9i0j-1234-56gh-7890-1234567890ij',
      crop: CROPS.CORN,
    },
    {
      farmId: '8h9i0j1k-2345-67hi-8901-2345678901jk',
      crop: CROPS.COTTON,
    },
    {
      farmId: '9i0j1k2l-3456-78ij-9012-3456789012kl',
      crop: CROPS.COTTON,
    },
    {
      farmId: '0j1k2l3m-4567-89jk-0123-4567890123lm',
      crop: CROPS.SUGAR_CANE,
    },
    {
      farmId: '1a2b3c4d-5678-90ab-cdef-1234567890ab',
      crop: CROPS.CORN,
    },
    {
      farmId: '2b3c4d5e-6789-01bc-def2-3456789012cd',
      crop: CROPS.SUGAR_CANE,
    },
    {
      farmId: '3c4d5e6f-7890-12cd-ef34-5678901234de',
      crop: CROPS.COFFEE,
    },
    {
      farmId: '4d5e6f7g-8901-23de-f456-7890123456ef',
      crop: CROPS.SOYBEANS,
    },
    {
      farmId: '5e6f7g8h-9012-34ef-5678-9012345678gh',
      crop: CROPS.CORN,
    },
    {
      farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
      crop: CROPS.COFFEE,
    },
    {
      farmId: '7g8h9i0j-1234-56gh-7890-1234567890ij',
      crop: CROPS.SUGAR_CANE,
    },
    {
      farmId: '8h9i0j1k-2345-67hi-8901-2345678901jk',
      crop: CROPS.SOYBEANS,
    },
    {
      farmId: '9i0j1k2l-3456-78ij-9012-3456789012kl',
      crop: CROPS.COFFEE,
    },
    {
      farmId: '0j1k2l3m-4567-89jk-0123-4567890123lm',
      crop: CROPS.CORN,
    },
  ];

  await prisma.cropsPlanted.createMany({
    data: cropsPlantedData,
  });

  console.log('CropsPlanted inserted successfully');
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
