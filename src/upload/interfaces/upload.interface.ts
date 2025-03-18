
// interfaces/file-storage.interface.ts
export interface FileUploadResult {
  url: string;
  id: string;
}

export interface FileStorageService {
  uploadSingle(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<FileUploadResult>;
  uploadMultiple(
    files: Express.Multer.File[],
    folder?: string,
  ): Promise<FileUploadResult[]>;
}
export const DATABASE_CONNECTION = 'UPLOAD';
