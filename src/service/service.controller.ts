import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Services')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @UseInterceptors(FileInterceptor('iconUrl'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateServiceDto })
  create(@Request() req, @Body() createServiceDto: CreateServiceDto, @UploadedFile() file?: Express.Multer.File) {
    return this.serviceService.create(createServiceDto, file, req.user);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto, @UploadedFile() file?: Express.Multer.File) {
    return this.serviceService.update(+id, updateServiceDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
