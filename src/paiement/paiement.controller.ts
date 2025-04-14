import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Paiement')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('paiements')
export class PaiementController {
  constructor(private readonly paiementService: PaiementService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un paiement (simulation)' })
  create(@Body() dto: CreatePaiementDto, @Request() req) {
    return this.paiementService.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les paiements' })
  findAll() {
    return this.paiementService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un paiement par ID' })
  findById(@Param('id') id: string) {
    return this.paiementService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un paiement' })
  update(@Param('id') id: string, @Body() dto: UpdatePaiementDto, @Request() req) {
    return this.paiementService.update(+id, dto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un paiement (soft delete)' })
  remove(@Param('id') id: string) {
    return this.paiementService.remove(+id);
  }
}
