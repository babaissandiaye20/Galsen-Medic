// src/reservation-document/reservation-document.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as QRCode from 'qrcode';
import * as PDFKit from 'pdfkit';
import { FileUploadResult } from '../../upload/interfaces/upload.interface';


@Injectable()
export class ReservationDocumentService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async generateAndUploadQRCode(
    reservationId: number,
    reservationUrl: string,
    folder: string = 'reservations/qrcodes',
  ): Promise<FileUploadResult> {
    try {
      const qrBuffer = await QRCode.toBuffer(reservationUrl, { width: 300 });
      return new Promise<FileUploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, resource_type: 'image' },
          (error, result) => {
            if (error || !result) {
              return reject(new BadRequestException('Erreur upload QR code'));
            }
            resolve({
              url: result.secure_url,
              id: result.public_id,
            });
          },
        );
        uploadStream.end(qrBuffer);
      });
    } catch (error) {
      throw new BadRequestException(`Erreur génération QR code: ${error.message}`);
    }
  }

  async generateAndUploadPDF(
    reservation: any,
    folder: string = 'reservations/pdfs',
  ): Promise<FileUploadResult> {
    try {
      const doc = new PDFKit();
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {});

      doc.fontSize(16).text('Confirmation de Réservation', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Réservation ID: ${reservation.id}`);
      doc.text(`Service: ${reservation.medecinSousService?.sousService?.nom || 'N/A'}`);
      doc.text(`Date: ${new Date(reservation.date).toLocaleDateString()}`);
      doc.text(`Heure: ${reservation.heureDebut} - ${reservation.heureFin}`);
      doc.text(`Montant: ${reservation.paiement?.montant || 'N/A'} ${reservation.paiement?.devise || ''}`);
      doc.end();

      const pdfBuffer = await new Promise<Buffer>((resolve) => {
        doc.on('end', () => resolve(Buffer.concat(buffers)));
      });

      return new Promise<FileUploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, resource_type: 'raw' },
          (error, result) => {
            if (error || !result) {
              return reject(new BadRequestException('Erreur upload PDF'));
            }
            resolve({
              url: result.secure_url,
              id: result.public_id,
            });
          },
        );
        uploadStream.end(pdfBuffer);
      });
    } catch (error) {
      throw new BadRequestException(`Erreur génération PDF: ${error.message}`);
    }
  }
}
