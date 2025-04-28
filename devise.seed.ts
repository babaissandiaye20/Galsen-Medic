import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Seeding des devises...');

  const devises = [
    { code: 'EUR', libelle: 'Euro', symbole: '€', actif: true },
    { code: 'USD', libelle: 'Dollar américain', symbole: '$', actif: true },
    { code: 'XOF', libelle: 'Franc CFA', symbole: 'F', actif: true },
  ];

  for (const devise of devises) {
    const exists = await prisma.devise.findUnique({ where: { code: devise.code } });

    if (!exists) {
      await prisma.devise.create({ data: devise });
      console.log(`✅ Devise "${devise.libelle}" créée`);
    } else {
      console.log(`ℹ️ Devise "${devise.libelle}" déjà existante`);
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed des devises:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
