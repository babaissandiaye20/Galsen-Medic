import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Optional } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { ChangePrivilegeDto } from './dto/change-privilege.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import {OptionalJwtAuthGuard} from '../auth/optional-jwt-auth.guard';

@ApiTags('Utilisateurs')
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  // @ts-ignore
  @Post()
  @ApiOperation({ summary: "Créer un utilisateur (admin ou inscription libre)" })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
  @ApiResponse({ status: 400, description: 'Erreur de validation' })
  @ApiResponse({ status: 403, description: "Seuls les administrateurs peuvent créer un utilisateur avec un privilège spécifique" })
  @ApiResponse({ status: 404, description: "Le privilège spécifié n'existe pas" })
  @ApiBearerAuth('access-token') // ✅ Swagger comprend que c'est optionnel
  @UseGuards(OptionalJwtAuthGuard) // ✅ Permet une authentification facultative
  create(@Body() createUtilisateurDto: CreateUtilisateurDto, @Request() req) {
    return this.utilisateurService.create(createUtilisateurDto, req.user);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Lister tous les utilisateurs actifs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée' })
  findAll() {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiResponse({ status: 200, description: 'Utilisateur récupéré avec succès' })
  @ApiResponse({ status: 404, description: "L'utilisateur n'existe pas" })
  findOne(@Param('id') id: string) {
    return this.utilisateurService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour avec succès' })
  @ApiResponse({ status: 404, description: "L'utilisateur n'existe pas" })
  update(@Param('id') id: string, @Body() updateUtilisateurDto: UpdateUtilisateurDto) {
    return this.utilisateurService.update(+id, updateUtilisateurDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Supprimer un utilisateur (Soft Delete)' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé avec succès' })
  @ApiResponse({ status: 404, description: "L'utilisateur n'existe pas" })
  remove(@Param('id') id: string) {
    return this.utilisateurService.remove(+id);
  }
}
