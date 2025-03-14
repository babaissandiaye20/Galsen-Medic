import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Privilèges')
@Controller('privileges')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un privilège' })
  @ApiResponse({ status: 201, description: 'Privilège créé avec succès' })
  @ApiResponse({ status: 400, description: 'Validation échouée' })
  create(@Body() createPrivilegeDto: CreatePrivilegeDto) {
    return this.privilegeService.create(createPrivilegeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les privilèges actifs' })
  findAll() {
    return this.privilegeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un privilège actif par ID' })
  findOne(@Param('id') id: string) {
    return this.privilegeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un privilège actif' })
  update(@Param('id') id: string, @Body() updatePrivilegeDto: UpdatePrivilegeDto) {
    return this.privilegeService.update(+id, updatePrivilegeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Désactiver un privilège (Soft Delete)' })
  remove(@Param('id') id: string) {
    return this.privilegeService.remove(+id);
  }
}
