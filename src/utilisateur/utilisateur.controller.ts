import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { ChangePrivilegeDto } from './dto/change-privilege.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { Public } from '@prisma/client/runtime/library';

@ApiTags('Utilisateurs')
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  @UseInterceptors(FileInterceptor('profilUrl'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Créer un utilisateur (admin ou inscription libre)' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUtilisateurDto: CreateUtilisateurDto,
    @Request() req,
  ) {
    return this.utilisateurService.create(createUtilisateurDto, req.user, file);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lister tous les utilisateurs' })
  findAll() {
    return this.utilisateurService.findAll();
  }
  // ✅ NOUVEL ENDPOINT
  @Get('non-clients')
  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lister tous les utilisateurs sauf ceux ayant le profil Client' })
  findAllExceptClients() {
    return this.utilisateurService.findAllWithoutAdminsAndClients();
  }
  @Get('Clients')
  //@ApiBearerAuth('access-token')
  //@ApiOperation({ summary: 'Lister tous les utilisateurs sauf ceux ayant le profil Client' })
  findAllClients() {
    return this.utilisateurService.findAllClients();
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  findOne(@Param('id') id: string) {
    return this.utilisateurService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profilUrl'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur (tous champs optionnels)' })
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
  ) {
    return this.utilisateurService.update(+id, updateUtilisateurDto, file);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  remove(@Param('id') id: string) {
    return this.utilisateurService.remove(+id);
  }
  // ← uniquement si tu utilises un guard global, mais dans ton cas pas nécessaire
  }
