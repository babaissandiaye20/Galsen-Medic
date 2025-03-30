import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { UploadService } from './upload.service';

@Global() // 👈 Ajoute ça ici
@Module({
  providers: [
    UploadService,
    CloudinaryService,
    {
      provide: 'UploadService',
      useClass: process.env.STORAGE_SERVICE === 'local'
        ? UploadService
        : CloudinaryService,
    },
  ],
  exports: ['UploadService'],
})
export class UploadModule {}
