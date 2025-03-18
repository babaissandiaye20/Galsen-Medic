import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@ApiTags('Privilèges')
@ApiBearerAuth('access-token') // Swagger : Token requis pour toutes les routes
@UseGuards(JwtAuthGuard) // ✅ Toutes les routes nécessitent l'authentification
@Controller('privileges')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un privilège (Admin uniquement)' })
  @ApiResponse({ status: 201, description: 'Privilège créé avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  create(@Body() createPrivilegeDto: CreatePrivilegeDto, @Request() req) {
    return this.privilegeService.create(createPrivilegeDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les privilèges (Admin uniquement)' })
  findAll(@Request() req) {
    return this.privilegeService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un privilège par ID (Admin uniquement)' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.privilegeService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un privilège (Admin uniquement)' })
  update(@Param('id') id: string, @Body() updatePrivilegeDto: UpdatePrivilegeDto, @Request() req) {
    return this.privilegeService.update(+id, updatePrivilegeDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un privilège (Admin uniquement)' })
  remove(@Param('id') id: string, @Request() req) {
    return this.privilegeService.remove(+id, req.user);
  }
}
