import { Module } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { PaiementController } from './paiement.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';

@Module({
  controllers: [PaiementController],
  providers: [PaiementService, PrismaService, ResponseService],
})
export class PaiementModule {}
