import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { UploadModule } from '../upload/upload.module';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';

@Module({
  controllers: [ServiceController],
  imports: [UploadModule], // Import du module contenant UploadService
  providers: [ServiceService, PrismaService, ResponseService],
  exports: [ServiceService],
})
export class ServiceModule {}
