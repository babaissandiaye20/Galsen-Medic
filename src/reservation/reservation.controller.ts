import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Réservations')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationController {
  constructor(private readonly service: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une réservation' })
  @ApiBody({ type: CreateReservationDto })
  create(@Body() dto: CreateReservationDto, @Request() req) {
    return this.service.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les réservations' })
  findAll(@Request() req) {
    return this.service.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Afficher une réservation' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.service.findOne(+id, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Annuler une réservation' })
  cancel(@Param('id') id: string, @Request() req) {
    return this.service.cancel(+id, req.user);
  }

  @Get('patient/:id')
  @ApiOperation({ summary: 'Toutes les réservations d’un patient' })
  findByPatient(@Param('id') id: string) {
    return this.service.findByPatient(+id);
  }

  @Get('medecin/:id')
  @ApiOperation({ summary: 'Toutes les réservations d’un médecin' })
  findByMedecin(@Param('id') id: string) {
    return this.service.findByMedecin(+id);
  }
}
