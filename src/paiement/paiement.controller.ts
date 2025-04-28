// src/paiement/paiement.controller.ts

import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementNabooDto } from './dto/create-paiement-naboo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { PaiementNabooService } from './paiement-naboo/paiement-naboo.service';

@ApiTags('Paiement')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('paiement')
export class PaiementController {
  constructor(
    private readonly paiementService: PaiementService,
    private readonly nabooService: PaiementNabooService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Créer une transaction Naboo' })
  @ApiBody({ type: CreatePaiementNabooDto })
  @ApiCreatedResponse({
    description: 'Paiement initié avec succès',
    schema: {
      example: {
        paiement: {
          id: 1,
          montant: 2000,
          paiementUrl: 'https://checkout.naboopay.com/...',
          referenceTransaction: 'NABOO-123456',
          etatTransaction: 'PENDING',
        },
        redirectUrl: 'http://localhost:4200/paiement-success?orderId=NABOO-123456',
        qrCode: {
          url: 'https://res.cloudinary.com/.../qr.png',
          id: 'cloudinary-qr-id',
        },
        pdf: {
          url: 'https://res.cloudinary.com/.../recu.pdf',
          id: 'cloudinary-pdf-id',
        },
      },
    },
  })
  creerPaiement(@Body() dto: CreatePaiementNabooDto, @Request() req) {
    return this.paiementService.payer(dto, req.user);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Récupérer une transaction Naboo' })
  @ApiParam({ name: 'orderId', description: 'ID de la transaction Naboo' })
  getTransaction(@Param('orderId') orderId: string) {
    return this.nabooService.getOneTransaction(orderId);
  }

  @Delete(':orderId')
  @ApiOperation({ summary: 'Supprimer une transaction Naboo' })
  @ApiParam({ name: 'orderId', description: 'ID de la transaction Naboo' })
  annulerTransaction(@Param('orderId') orderId: string) {
    return this.nabooService.deleteTransaction(orderId);
  }
}
