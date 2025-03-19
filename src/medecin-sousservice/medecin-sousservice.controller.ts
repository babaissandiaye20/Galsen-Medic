import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request
} from '@nestjs/common';
import { MedecinSousServiceService } from './medecin-sousservice.service';
import { CreateMedecinSousServiceDto } from './dto/create-medecin-sous-service';
import { UpdateMedecinSousServiceDto } from './dto/update-medecin-sous-service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@ApiTags('Médecins Sous Services')
@Controller('medecin-sous-service')
export class MedecinSousServiceController {
  constructor(private readonly service: MedecinSousServiceService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Associer un médecin à un sous-service" })
  @ApiResponse({ status: 201, description: 'Médecin sous-service ajouté avec succès' })
  create(@Body() dto: CreateMedecinSousServiceDto, @Request() req) {
    return this.service.create(dto, req.user);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Lister tous les médecins sous-services" })
  @ApiResponse({ status: 200, description: 'Liste récupérée avec succès' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Obtenir un médecin sous-service par ID" })
  @ApiResponse({ status: 200, description: 'Médecin sous-service récupéré' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Modifier un médecin sous-service" })
  @ApiResponse({ status: 200, description: 'Médecin sous-service mis à jour' })
  update(@Param('id') id: string, @Body() dto: UpdateMedecinSousServiceDto, @Request() req) {
    return this.service.update(+id, dto, req.user);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Supprimer un médecin sous-service (Soft Delete)" })
  @ApiResponse({ status: 200, description: 'Médecin sous-service supprimé' })
  remove(@Param('id') id: string, @Request() req) {
    return this.service.remove(+id, req.user);
  }
}
