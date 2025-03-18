import { Injectable, Logger } from '@nestjs/common';
import {
  FileStorageService,
  FileUploadResult,
} from './interfaces/upload.interface';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
@Injectable()
export class UploadService implements FileStorageService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uploadFile(image: Express.Multer.File) {
    throw new Error('Method not implemented.');
  }
  private logger = new Logger(UploadService.name);
  private baseDir: string;

  constructor() {
    this.baseDir = process.env.UPLOAD_DIR || 'uploads';
  }

  private async ensureDirectory(folder: string): Promise<string> {
    const dirPath = path.join(this.baseDir, folder);
    await fs.mkdir(dirPath, { recursive: true });
    return dirPath;
  }

  private generateFileName(originalName: string): string {
    const ext = path.extname(originalName);
    const hash = crypto.randomBytes(8).toString('hex');
    return `${hash}${ext}`;
  }

  async uploadSingle(
    file: Express.Multer.File,
    folder: string = 'hotel-chambres',
  ): Promise<FileUploadResult> {
    const dirPath = await this.ensureDirectory(folder);
    const fileName = this.generateFileName(file.originalname);
    const filePath = path.join(dirPath, fileName);

    try {
      await fs.writeFile(filePath, file.buffer);
      const relativePath = path.join(folder, fileName);

      return {
        url: `/uploads/${relativePath}`,
        id: relativePath,
      };
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'enregistrement du fichier: ${error.message}`,
      );
      throw error;
    }
  }

  async uploadMultiple(
    files: Express.Multer.File[],
    folder: string = 'hotel-chambres',
  ): Promise<FileUploadResult[]> {
    if (!files?.length) return [];

    try {
      return await Promise.all(
        files.map((file) => this.uploadSingle(file, folder)),
      );
    } catch (error) {
      this.logger.error(`Échec de l'upload batch: ${error.message}`);
      throw error;
    }
  }
}