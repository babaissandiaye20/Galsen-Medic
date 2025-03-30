import { Module } from '@nestjs/common';
import { StatutReservationService } from './statut-reservation.service';
import { StatutReservationController } from './statut-reservation.controller';

@Module({
  providers: [StatutReservationService],
  controllers: [StatutReservationController],
  imports: [],
  exports: [],
})
export class StatutReservationModule {}
