import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { StatutReservationService } from './statut-reservation.service';
import { CreateStatutReservationDto } from './dto/create-statut-reservation.dto';
import { UpdateStatutReservationDto } from './dto/update-statut-reservation.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Statuts de Réservation')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('statuts-reservation')
export class StatutReservationController {
  constructor(private readonly service: StatutReservationService) {}

  @Post()
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Créer un nouveau statut de réservation' })
  create(@Body() dto: CreateStatutReservationDto, @Request() req) {
    return this.service.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Afficher tous les statuts de réservation actifs' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Afficher un statut de réservation par ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID du statut à récupérer' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Modifier un statut de réservation par ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID du statut à modifier' })
  update(@Param('id') id: string, @Body() dto: UpdateStatutReservationDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un statut de réservation (soft delete)' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID du statut à supprimer' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
