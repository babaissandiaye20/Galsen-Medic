import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('💳 Seeding des modes de paiement...');

  const modesPaiement = [
    {
      libelle: 'WAVE',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Wave_Logo_2021.svg/512px-Wave_Logo_2021.svg.png',
    },
    {
      libelle: 'ORANGE_MONEY',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Orange_logo.svg/512px-Orange_logo.svg.png',
    },
    {
      libelle: 'FREE_MONEY',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Logo_Free.svg/512px-Logo_Free.svg.png',
    },
  ];

  for (const mode of modesPaiement) {
    const exists = await prisma.modePaiement.findFirst({
      where: { libelle: mode.libelle, deletedAt: null },
    });

    if (exists) {
      console.log(`ℹ️ Mode "${mode.libelle}" déjà existant`);
      continue;
    }

    await prisma.modePaiement.create({
      data: {
        libelle: mode.libelle,
        icon: mode.icon,
      },
    });

    console.log(`✅ Mode "${mode.libelle}" ajouté`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
