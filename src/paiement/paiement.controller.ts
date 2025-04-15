import {
  Controller, Post, Get, Delete, Body, Param, Request, UseGuards,
} from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementNabooDto } from './dto/create-paiement-naboo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import {
  ApiBearerAuth, ApiTags, ApiOperation, ApiBody, ApiParam,
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
  creerPaiement(@Body() dto: CreatePaiementNabooDto, @Request() req) {
    return this.paiementService.payer(dto, req.user);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Récupérer une transaction Naboo' })
  @ApiParam({ name: 'orderId', description: 'Order ID Naboo' })
  getTransaction(@Param('orderId') orderId: string) {
    return this.nabooService.getOneTransaction(orderId);
  }

  @Delete(':orderId')
  @ApiOperation({ summary: 'Supprimer une transaction Naboo' })
  @ApiParam({ name: 'orderId', description: 'Order ID Naboo' })
  annulerTransaction(@Param('orderId') orderId: string) {
    return this.nabooService.deleteTransaction(orderId);
  }

  @Post('cashout')
  @ApiOperation({ summary: 'Faire un cashout Naboo vers OM ou Wave' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        full_name: { type: 'string', example: 'Zigfreak02' },
        phone_number: { type: 'string', example: '770000000' },
        amount: { type: 'number', example: 10000 },
        method: {
          type: 'string',
          enum: ['WAVE', 'ORANGE_MONEY'],
          example: 'WAVE',
        },
      },
    },
  })
  cashout(@Body() body: {
    full_name: string;
    phone_number: string;
    amount: number;
    method: 'WAVE' | 'ORANGE_MONEY';
  }) {
    return this.nabooService.cashout(body);
  }
}
