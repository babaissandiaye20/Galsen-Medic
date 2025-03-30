import { Module } from '@nestjs/common';
import { TarifService } from './tarif.service';
import { TarifController } from './tarif.controller';
import { ResponseService } from '../validation/exception/response/response.service';

@Module({
  providers: [TarifService],
  controllers: [TarifController],
  imports: [],
  exports: [],
})
export class TarifModule {}
