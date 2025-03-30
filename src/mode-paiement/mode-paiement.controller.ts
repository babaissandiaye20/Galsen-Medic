import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile, UseInterceptors, UseGuards, Request
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ModePaiementService } from './mode-paiement.service';
// @ts-ignore
import {CreateModePaiementDto} from './dto/create-mode-paiement.dto.';
import { UpdateModePaiementDto } from './dto/update-mode-paiement.dto';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Mode de paiement')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('mode-paiement')
export class ModePaiementController {
  constructor(private readonly modePaiementService: ModePaiementService) {}

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateModePaiementDto })
  create(@Request() req, @Body() dto: CreateModePaiementDto, @UploadedFile() file?: Express.Multer.File) {
    return this.modePaiementService.create(dto, file, req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.modePaiementService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modePaiementService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('icon'))
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() dto: UpdateModePaiementDto, @UploadedFile() file?: Express.Multer.File) {
    return this.modePaiementService.update(+id, dto, file);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modePaiementService.remove(+id);
  }
}
