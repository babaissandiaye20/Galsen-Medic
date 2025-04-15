import { Module } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { PaiementController } from './paiement.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { PaiementNabooService } from './paiement-naboo/paiement-naboo.service';
import { ReservationModule } from '../reservation/reservation.module';
import { ReservationDocumentService } from '../reservation/reservation-document/reservation-document.service';

@Module({
  controllers: [PaiementController],
  providers: [
    PaiementService,
    PaiementNabooService,
    PrismaService,
    ResponseService,
    ReservationDocumentService, // ✅ on le force ici
  ],
  imports: [ReservationModule], // ✅ indispensable aussi
})
export class PaiementModule {}
