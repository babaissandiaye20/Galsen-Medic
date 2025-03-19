import { Module } from '@nestjs/common';
import { DisponibiliteService } from './disponibilite.service';
import { DisponibiliteController } from './disponibilite.controller';
import { ResponseService } from '../validation/exception/response/response.service';

@Module({
  controllers: [DisponibiliteController],
  providers: [DisponibiliteService, ResponseService],
})
export class DisponibiliteModule {}
