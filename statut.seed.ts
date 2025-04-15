import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const statuts = [
    { libelle: 'PENDING' },
    { libelle: 'CONFIRMED' },
    { libelle: 'CANCELLED' },
  ];

  for (const statut of statuts) {
    await prisma.statutReservation.upsert({
      where: { libelle: statut.libelle },
      update: {},
      create: statut,
    });
  }

  console.log('✅ Statuts de réservation insérés avec succès');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed des statuts', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
