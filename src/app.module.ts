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
import { PaiementService } from './paiement/paiement.service';
import { PaiementController } from './paiement/paiement.controller';
import { PaiementModule } from './paiement/paiement.module';
import { ReservationModule } from './reservation/reservation.module';
import { PaiementNabooService } from './paiement/paiement-naboo/paiement-naboo.service';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config'
import { RedisService } from './redis/redis.service';
import {  RedisModule as RedisCustomModule} from './redis/redis.module'


// @ts-ignore
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    // Redis intégré proprement
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'single',
        url: configService.get<string>('REDIS_URL'),
        // options: { ... } // tu peux rajouter des options avancées ici
      }),
    }),


    PrismaModule, PrivilegeModule, ValidationModule, UtilisateurModule, AuthModule, LogModule, UploadModule, ServiceModule, SousServiceModule, MedecinSousserviceModule, DisponibiliteModule, TarifModule, StatutReservationModule, ModePaiementModule, PaiementModule,ReservationModule, RedisModule,RedisCustomModule],
  controllers: [AppController, DisponibiliteController, DeviseController, TarifController, StatutReservationController, PaiementController],
  providers: [AppService, PrismaService, ValidationService, ServiceService,UploadService, DisponibiliteService, DeviseService, TarifService, StatutReservationService, PaiementService, PaiementNabooService, RedisService],
})
export class AppModule {}
