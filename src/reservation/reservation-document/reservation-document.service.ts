import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as QRCode from 'qrcode';
import * as PDFKit from 'pdfkit';
import { FileUploadResult } from '../../upload/interfaces/upload.interface';
import * as stream from 'stream';
import * as moment from 'moment';
import 'moment/locale/fr';

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
    reservation: any,
    folder = 'reservations/qrcodes',
  ): Promise<FileUploadResult> {
    try {
      const jour = moment(reservation.date).locale('fr').format('dddd');
      const date = moment(reservation.date).locale('fr').format('D MMMM YYYY');
      const heure = `${reservation.heureDebut} - ${reservation.heureFin}`;
      const service = reservation.medecinSousService?.sousService?.nom || 'Service';
      const medecin = reservation.medecinSousService?.medecin?.nom || 'Docteur';

      const qrText = `Clinique Léontine\nService : ${service}\nMédecin : ${medecin}\nDate : ${jour} ${date}\nHeure : ${heure}`;

      const qrBuffer = await QRCode.toBuffer(qrText, { width: 300 });

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
    folder = 'reservations/pdfs',
  ): Promise<FileUploadResult> {
    try {
      const doc = new PDFKit({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {});

      const nomMedecin = reservation.medecinSousService?.medecin?.nom || 'Docteur';
      const service = reservation.medecinSousService?.sousService?.nom || 'Service';
      const montant = reservation.montant || reservation.paiement?.montant || 0;
      const devise = reservation.devise || reservation.paiement?.devise || 'F';
      const date = moment(reservation.date).locale('fr').format('D MMMM YYYY');
      const jour = moment(reservation.date).locale('fr').format('dddd');
      const heure = `${reservation.heureDebut} - ${reservation.heureFin}`;
      const numeroRecu = reservation.id.toString().padStart(4, '0');

      const qrCodeBuffer = await QRCode.toBuffer(
        `Clinique Léontine\nService : ${service}\nMédecin : ${nomMedecin}\nDate : ${jour} ${date}\nHeure : ${heure}`,
        { width: 300 },
      );

      // HEADER
      doc.fontSize(20).text('Clinique Léontine', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(14).text('***************', { align: 'center' });
      doc.moveDown(0.3);
      doc.fontSize(14).text(`Reçu N°${numeroRecu}`, { align: 'center' });

      doc.moveDown(1);
      doc.fontSize(12).text(`Jour :        ${jour}`);
      doc.text('***************************************');

      doc.text(`Date :        ${date}`);
      doc.text('***************************************');

      doc.text(`Heure :       ${heure}`);
      doc.text('***************************************');

      doc.text(`Service :     ${service}`);
      doc.text('***************************************');

      doc.text(`Médecin :     ${nomMedecin}`);
      doc.text('***************************************');

      doc.text(`Prix :        ${Number(montant).toLocaleString()}${devise}`);
      doc.text('***************************************');

      // QR CODE
      doc.moveDown(1);
      doc.image(qrCodeBuffer, { align: 'center', fit: [180, 180], valign: 'center' });

      doc.moveDown(1);
      doc.fontSize(14).text('Remarque :', { align: 'center' });
      doc.moveDown(0.2);
      doc.fontSize(10).text(
        'Veuillez garder ce reçu jusqu’au\njour de votre rendez-vous',
        { align: 'center' },
      );

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
        const readableStream = new stream.PassThrough();
        readableStream.end(pdfBuffer);
        readableStream.pipe(uploadStream);
      });
    } catch (error) {
      throw new BadRequestException(`Erreur génération PDF: ${error.message}`);
    }
  }
}
