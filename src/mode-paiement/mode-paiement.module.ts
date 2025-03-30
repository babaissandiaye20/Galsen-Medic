import { Module } from '@nestjs/common';
import { ModePaiementService } from './mode-paiement.service';
import { ModePaiementController } from './mode-paiement.controller';
import { UploadModule } from '../upload/upload.module';

@Module({
  providers: [ModePaiementService],
  controllers: [ModePaiementController],
  imports: [UploadModule],
  exports: [],
})
export class ModePaiementModule {}
