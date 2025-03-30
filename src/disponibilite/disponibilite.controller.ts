import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { DisponibiliteService } from './disponibilite.service';
import { CreateDisponibiliteDto } from './dto/create-disponibilite.dto';
import { UpdateDisponibiliteDto } from './dto/update-disponibilite.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@ApiTags('Disponibilités')
@Controller('disponibilites')
export class DisponibiliteController {
  constructor(private readonly disponibiliteService: DisponibiliteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Créer une disponibilité' })
  create(@Body() dto: CreateDisponibiliteDto, @Request() req) {
    return this.disponibiliteService.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les disponibilités' })
  findAll() {
    return this.disponibiliteService.findAll();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une disponibilité par ID' })
  findById(@Param('id') id: string) {
    return this.disponibiliteService.findDisponibilitesById(+id);
  }
  @Get('medecin/:idMedecin')
  @ApiOperation({ summary: "Récupérer toutes les disponibilités d'un médecin" })
  findByMedecin(@Param('idMedecin') idMedecin: string) {
    return this.disponibiliteService.findDisponibilitesByMedecin(+idMedecin);
  }

}
