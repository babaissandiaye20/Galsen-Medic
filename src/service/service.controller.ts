import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { CachePrefix } from '../common/decorator/cache-prefix.decorator';
import { Cacheable } from '../common/decorator/cacheable.decorator';
import { CacheEvict } from '../common/decorator/cache-evict.decorator';

@ApiTags('Services')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@CachePrefix('service')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @CacheEvict({ key: 'all' })
  @Post()
  @UseInterceptors(FileInterceptor('iconUrl')) // ✅ doit matcher le champ fichier envoyé
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateServiceDto })
  create(
    @Request() req,
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.serviceService.create(createServiceDto, file, req.user);
  }

  @Cacheable({ key: 'all', ttl: 300 })
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Cacheable({
    key: (params) => `${params.id}`,
    ttl: 300,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @CacheEvict({
    key: (params) => `${params.id}`,
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('iconUrl')) // ✅ harmonisé avec create()
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.serviceService.update(+id, updateServiceDto, file);
  }

  @CacheEvict({
    key: (params) => `${params.id}`,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
