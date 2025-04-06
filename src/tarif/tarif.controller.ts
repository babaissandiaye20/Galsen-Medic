import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { TarifService } from './tarif.service';
import { CreateTarifDto } from './dto/create-tarif.dto';
import { UpdateTarifDto } from './dto/update-tarif.dto';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Tarifs')
@Controller('tarifs')
export class TarifController {
  constructor(private readonly tarifService: TarifService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un tarif' })
  create(@Body() dto: CreateTarifDto) {
    return this.tarifService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les tarifs' })
  @ApiQuery({ name: 'idSousService', required: false, type: Number })
  findAll(@Query('idSousService') idSousService?: string) {
    if (idSousService) {
      return this.tarifService.findAllBySousService(+idSousService);
    }
    return this.tarifService.findAll();
  }

  @Get('sous-service/:id/full')
  @ApiOperation({ summary: 'Lister tous les tarifs (actifs + inactifs) d’un sous-service' })
  @ApiParam({ name: 'id', type: 'number' })
  findAllTarifsOfSousService(@Param('id') id: string) {
    return this.tarifService.findAllBySousServiceFull(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un tarif par ID' })
  @ApiParam({ name: 'id', type: 'number' })
  findById(@Param('id') id: string) {
    return this.tarifService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un tarif' })
  @ApiParam({ name: 'id', type: 'number' })
  update(@Param('id') id: string, @Body() dto: UpdateTarifDto) {
    return this.tarifService.update(+id, dto);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activer un tarif et désactiver les autres pour le même sous-service' })
  @ApiParam({ name: 'id', type: 'number' })
  activate(@Param('id') id: string) {
    return this.tarifService.activate(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un tarif' })
  @ApiParam({ name: 'id', type: 'number' })
  delete(@Param('id') id: string) {
    return this.tarifService.delete(+id);
  }
  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Désactiver un tarif manuellement' })
  @ApiParam({ name: 'id', type: 'number' })
  deactivate(@Param('id') id: string) {
    return this.tarifService.deactivate(+id);
  }

}
