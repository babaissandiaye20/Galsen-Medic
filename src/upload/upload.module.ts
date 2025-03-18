import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { UploadService } from './upload.service';

@Module({
  providers: [
    {
      provide: 'UploadService',
      useClass: process.env.STORAGE_SERVICE === 'local'
        ? UploadService
        : CloudinaryService,
    },
  ],
  exports: ['UploadService'], // Export sous forme de token
})
export class UploadModule {}
