import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Vérifier si un admin existe déjà
  const existingAdmin = await prisma.utilisateur.findFirst({
    where: { email: 'babaissandiaye242@gmail.com' },
  });

  if (existingAdmin) {
    console.log('✅ Admin déjà existant, aucun seed nécessaire.');
    return;
  }

  // Trouver le privilège "Admin"
  let adminPrivilege = await prisma.privilege.findFirst({
    where: { libelle: 'Admin' },
  });

  if (!adminPrivilege) {
    // Créer le privilège "Admin" s'il n'existe pas
    adminPrivilege = await prisma.privilege.create({
      data: {
        libelle: 'Admin',
      },
    });
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Créer l'utilisateur admin
  const adminUser = await prisma.utilisateur.create({
    data: {
      nom: 'Ndiaye',
      prenom: 'Baba Issa',
      email: 'babaissandiaye242@gmail.com',
      password: hashedPassword,
      telephone: '+221786360662', // Remplace avec un vrai numéro
      idPrivilege: adminPrivilege.id, // Associe l'admin à son privilège
      profil: 'Admin',
    },
  });

  console.log('✅ Admin créé avec succès:', adminUser);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
