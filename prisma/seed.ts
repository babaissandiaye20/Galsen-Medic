import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding base...');

  // 1. Créer les privilèges de base
  const privileges = ['Admin', 'Client', 'Médecin'];

  for (const libelle of privileges) {
    const exists = await prisma.privilege.findUnique({ where: { libelle } });
    if (!exists) {
      await prisma.privilege.create({ data: { libelle } });
      console.log(`✅ Privilège "${libelle}" créé`);
    } else {
      console.log(`ℹ️ Privilège "${libelle}" déjà existant`);
    }
  }

  // 2. Créer un admin par défaut s'il n'existe pas
  const adminEmail = 'babaissandiaye242@gmail.com';

  const existingAdmin = await prisma.utilisateur.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Admin déjà existant, rien à faire.');
    return;
  }

  const adminPrivilege = await prisma.privilege.findUnique({ where: { libelle: 'Admin' } });

  if (!adminPrivilege) {
    throw new Error('❌ Le privilège "Admin" est introuvable.');
  }

  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.utilisateur.create({
    data: {
      nom: 'Ndiaye',
      prenom: 'Baba Issa',
      email: adminEmail,
      password: hashedPassword,
      telephone: '+221786360662',
      idPrivilege: adminPrivilege.id,
      profil: 'Admin',
    },
  });

  console.log('✅ Utilisateur admin créé avec succès:', adminUser.email);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
