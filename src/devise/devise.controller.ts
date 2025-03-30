import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { DeviseService } from './devise.service';
import { CreateDeviseDto } from './dto/create-devise.dto';
import { UpdateDeviseDto } from './dto/update-devise.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Devises')
@Controller('devises')
export class DeviseController {
  constructor(private readonly deviseService: DeviseService) {}

  /**
   * ✅ Créer une devise
   */
  @Post()
  @ApiOperation({ summary: 'Créer une devise' })
  create(@Body() dto: CreateDeviseDto) {
    return this.deviseService.create(dto);
  }

  /**
   * ✅ Récupérer toutes les devises
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les devises' })
  findAll() {
    return this.deviseService.findAll();
  }

  /**
   * ✅ Récupérer une devise par ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une devise par ID' })
  findById(@Param('id') id: string) {
    return this.deviseService.findById(+id);
  }

  /**
   * ✅ Mettre à jour une devise
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une devise' })
  update(@Param('id') id: string, @Body() dto: UpdateDeviseDto) {
    return this.deviseService.update(+id, dto);
  }

  /**
   * ✅ Activer une devise et désactiver les autres
   */
  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activer une devise et désactiver les autres' })
  activate(@Param('id') id: string) {
    return this.deviseService.activate(+id);
  }

  /**
   * ✅ Supprimer une devise (soft delete)
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une devise' })
  delete(@Param('id') id: string) {
    return this.deviseService.delete(+id);
  }
}
