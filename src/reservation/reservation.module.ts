import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { ReservationDocumentService } from './reservation-document/reservation-document.service';
import { CloudinaryService } from '../upload/cloudinary/cloudinary.service';

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationDocumentService,
    PrismaService,
    ResponseService,
    CloudinaryService,
  ],
  exports: [ReservationService, ReservationDocumentService],
})
export class ReservationModule {}
