// src/paiement/paiement.service.ts

import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { CreatePaiementNabooDto } from './dto/create-paiement-naboo.dto';
import { PaiementNabooService } from './paiement-naboo/paiement-naboo.service';
import { ReservationDocumentService } from '../reservation/reservation-document/reservation-document.service';
import * as crypto from 'crypto';

@Injectable()
export class PaiementService {
  private readonly webhookSecret =
    process.env.WEBHOOK_SECRET || 'default_webhook_secret';

  constructor(
    private prisma: PrismaService,
    private response: ResponseService,
    private naboo: PaiementNabooService,
    private documentService: ReservationDocumentService,
  ) {}

  async payer(dto: CreatePaiementNabooDto, currentUser: any) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: dto.idReservation },
      include: {
        paiement: true,
        medecinSousService: {
          include: {
            medecin: true,
            sousService: {
              include: {
                tarifs: {
                  where: { actif: true },
                  include: { devise: true },
                },
              },
            },
          },
        },
        statutReservation: true,
      },
    });

    if (!reservation) {
      throw new NotFoundException(this.response.notFound('Réservation introuvable'));
    }

    if (reservation.paiement) {
      throw new ConflictException(this.response.conflict('Paiement déjà existant'));
    }

    if (
      reservation.idUtilisateur !== currentUser.id &&
      currentUser.privilege?.libelle !== 'Admin'
    ) {
      throw new ForbiddenException(this.response.forbidden('Accès non autorisé à cette réservation'));
    }

    const tarif = reservation.medecinSousService?.sousService?.tarifs[0];
    if (!tarif) {
      throw new NotFoundException(this.response.notFound('Aucun tarif disponible'));
    }

    const modePaiement = await this.prisma.modePaiement.findUnique({
      where: { id: dto.idModePaiement },
    });
    if (!modePaiement) {
      throw new NotFoundException(this.response.notFound('Mode de paiement invalide'));
    }

    const result = await this.naboo.createTransaction({
      montant: tarif.montant,
      method: modePaiement.libelle as 'WAVE' | 'ORANGE_MONEY' | 'FREE_MONEY',
      description: `Paiement pour réservation #${reservation.id}`,
    });

    const paiement = await this.prisma.paiement.create({
      data: {
        idReservation: dto.idReservation,
        montant: result.montant,
        idModePaiement: dto.idModePaiement,
        referenceTransaction: result.orderId,
        paiementUrl: result.paiementUrl,
        etatTransaction: result.statut,
      },
    });

    const successUrl =
      dto.successUrl ||
      `${process.env.APP_SUCCESS_URL || 'http://localhost:4200/paiement-success'}?orderId=${result.orderId}`;

    const qrResult = await this.documentService.generateAndUploadQRCode(
      reservation.id,
      successUrl,
    );

    const pdfResult = await this.documentService.generateAndUploadPDF({
      ...reservation,
      montant: result.montant,
      devise: tarif.devise.symbole || tarif.devise.libelle || '',
    });

    await this.prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        qrCodeUrl: qrResult.url,
        pdfUrl: pdfResult.url,
        etatPaiement: 'PENDING',
      },
    });

    /**
     * 🔥 Simuler webhook en local/dev automatiquement
     */
    if (process.env.NODE_ENV === 'development') {
      const fakeWebhookBody = {
        order_id: result.orderId,
        transaction_status: 'COMPLETED',
        montant: result.montant,
      };

      const fakeSignature = crypto
        .createHmac('sha256', this.webhookSecret)
        .update(JSON.stringify(fakeWebhookBody))
        .digest('hex');

      await this.handleNabooWebhook(fakeWebhookBody, fakeSignature);
    }

    return this.response.created(
      {
        paiement,
        paiementUrl: result.paiementUrl,
        redirectUrl: successUrl,
        qrCode: qrResult,
        pdf: pdfResult,
      },
      'Transaction initiée avec succès',
    );
  }

  async handleNabooWebhook(
    body: { order_id: string; transaction_status: string; montant: number },
    signature: string,
  ) {
    const computedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (computedSignature !== signature) {
      throw new BadRequestException('Signature invalide');
    }

    const paiement = await this.prisma.paiement.findFirst({
      where: { referenceTransaction: body.order_id },
      include: { reservation: true },
    });

    if (!paiement) {
      throw new NotFoundException(this.response.notFound('Paiement introuvable'));
    }

    await this.prisma.paiement.update({
      where: { id: paiement.id },
      data: { etatTransaction: body.transaction_status },
    });

    const confirmedStatut = await this.prisma.statutReservation.findFirst({
      where: { libelle: 'CONFIRMED' },
    });
    const cancelledStatut = await this.prisma.statutReservation.findFirst({
      where: { libelle: 'CANCELLED' },
    });

    if (!confirmedStatut || !cancelledStatut) {
      throw new NotFoundException(this.response.notFound('Statut de réservation introuvable'));
    }

    if (body.transaction_status === 'COMPLETED') {
      await this.prisma.reservation.update({
        where: { id: paiement.idReservation },
        data: {
          idStatutReservation: confirmedStatut.id,
          etatPaiement: 'PAID',
        },
      });
    } else {
      await this.prisma.reservation.update({
        where: { id: paiement.idReservation },
        data: {
          idStatutReservation: cancelledStatut.id,
          etatPaiement: 'CANCELLED',
          qrCodeUrl: null,
          pdfUrl: null,
        },
      });
    }

    return this.response.success(null, 'Webhook traité avec succès');
  }
}
