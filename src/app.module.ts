import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrivilegeModule } from './privilege/privilege.module';
import { ValidationService } from './validation/validation.service';
import { ValidationModule } from './validation/validation.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LogModule } from './log/log.module';
import { LogListener } from './log-listener/log-listener';
import { UploadModule } from './upload/upload.module';
import { ServiceService } from './service/service.service';

import { ServiceModule } from './service/service.module';
import { SousServiceModule } from './sous-service/sous-service.module';
import { UploadService } from './upload/upload.service';
import { MedecinSousserviceModule } from './medecin-sousservice/medecin-sousservice.module';
import { DisponibiliteService } from './disponibilite/disponibilite.service';
import { DisponibiliteController } from './disponibilite/disponibilite.controller';
import { DisponibiliteModule } from './disponibilite/disponibilite.module';
import { DeviseService } from './devise/devise.service';
import { DeviseController } from './devise/devise.controller';
import { TarifController } from './tarif/tarif.controller';
import { TarifService } from './tarif/tarif.service';
import { TarifModule } from './tarif/tarif.module';
import { StatutReservationService } from './statut-reservation/statut-reservation.service';
import { StatutReservationController } from './statut-reservation/statut-reservation.controller';
import { StatutReservationModule } from './statut-reservation/statut-reservation.module';
import { ModePaiementModule } from './mode-paiement/mode-paiement.module';


@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, PrivilegeModule, ValidationModule, UtilisateurModule, AuthModule, LogModule, UploadModule, ServiceModule, SousServiceModule, MedecinSousserviceModule, DisponibiliteModule, TarifModule, StatutReservationModule, ModePaiementModule],
  controllers: [AppController, DisponibiliteController, DeviseController, TarifController, StatutReservationController],
  providers: [AppService, PrismaService, ValidationService, ServiceService,UploadService, DisponibiliteService, DeviseService, TarifService, StatutReservationService],
})
export class AppModule {}
