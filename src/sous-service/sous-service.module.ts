import { Module } from '@nestjs/common';
import { SousServiceService } from './sous-service.service';
import { SousServiceController } from './sous-service.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [UploadModule],
  providers: [SousServiceService, PrismaService, ResponseService],
  controllers: [SousServiceController],
  exports: [SousServiceService],
})
export class SousServiceModule {}
