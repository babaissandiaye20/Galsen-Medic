import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { SousServiceService } from './sous-service.service';
import { CreateSousServiceDto } from './dto/create-sous-service.dto';
import { UpdateSousServiceDto } from './dto/update-sous-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Sous-Services')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('sous-services')
export class SousServiceController {
  constructor(private readonly sousServiceService: SousServiceService) {}

  @Post()
  @UseInterceptors(FileInterceptor('iconUrl'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateSousServiceDto })
  create(@Request() req, @Body() createSousServiceDto: CreateSousServiceDto, @UploadedFile() file?: Express.Multer.File) {
    return this.sousServiceService.create(createSousServiceDto, file, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sousServiceService.findOne(+id);
  }

  @Get('by-service/:idService')
  findByServiceId(@Param('idService') idService: string) {
    return this.sousServiceService.findByServiceId((+idService));
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() updateSousServiceDto: UpdateSousServiceDto, @UploadedFile() file?: Express.Multer.File) {
    return this.sousServiceService.update(+id, updateSousServiceDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sousServiceService.remove(+id);
  }


}
