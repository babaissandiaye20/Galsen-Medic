import { Module } from '@nestjs/common';
import { MedecinSousServiceService } from './medecin-sousservice.service';
import { MedecinSousServiceController } from './medecin-sousservice.controller';

@Module({
  providers: [MedecinSousServiceService],
  controllers: [ MedecinSousServiceController]
})
export class MedecinSousserviceModule {}
