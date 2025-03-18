// services/cloudinary.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import {
  FileStorageService,
  FileUploadResult,
} from '../interfaces/upload.interface';

@Injectable()
export class CloudinaryService implements FileStorageService {
  private logger = new Logger(CloudinaryService.name);

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadSingle(
    file: Express.Multer.File,
    folder: string = 'hotel-chambres',
  ): Promise<FileUploadResult> {
    return new Promise<FileUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            this.logger.error(
              `Erreur lors de l'upload: ${JSON.stringify(error)}`,
            );
            return reject(error);
          }
          if (!result) {
            return reject(new Error("Résultat d'upload vide"));
          }
          this.logger.log(`Image uploadée avec succès: ${result.public_id}`);
          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
        },
      );

      uploadStream.end(file.buffer);
    });
  }

  async uploadMultiple(
    files: Express.Multer.File[],
    folder: string = 'hotel-chambres',
  ): Promise<FileUploadResult[]> {
    if (!files?.length) return [];

    files.forEach((file, index) => {
      if (!file.buffer?.length) {
        throw new Error(
          `Le fichier à l'index ${index} n'a pas de contenu valide`,
        );
      }
    });

    try {
      return await Promise.all(
        files.map((file) => this.uploadSingle(file, folder)),
      );
    } catch (error) {
      this.logger.error(`Échec de l'upload batch: ${error.message}`);
      throw new Error(`Échec de l'upload des images: ${error.message}`);
    }
  }
}