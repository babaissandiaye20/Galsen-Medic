import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; // ✅ Importer AuthModule pour avoir accès à JwtService
import { UploadModule } from '../upload/upload.module';
@Module({
  imports: [AuthModule,UploadModule], // ✅ Ajout de AuthModule pour éviter l'erreur
  controllers: [UtilisateurController],
  providers: [UtilisateurService, PrismaService],
  exports: [UtilisateurService],
})
export class UtilisateurModule {}
