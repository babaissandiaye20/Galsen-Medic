// src/paiement/paiement.service.ts
import { Injectable, ConflictException, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { CreatePaiementNabooDto } from './dto/create-paiement-naboo.dto';
import { PaiementNabooService } from './paiement-naboo/paiement-naboo.service';

import * as crypto from 'crypto';
import { ReservationDocumentService } from '../reservation/reservation-document/reservation-document.service';

@Injectable()
export class PaiementService {
  private readonly webhookSecret = process.env.WEBHOOK_SECRET || 'bba93370af52ecd7a64549a9bf09aa321a2d4dd0';

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
    if (reservation.idUtilisateur !== currentUser.id && currentUser.privilege?.libelle !== 'Admin') {
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

    const qrResult = await this.documentService.generateAndUploadQRCode(
      reservation.id,
      `${process.env.API_BASE_URL || 'https://votreapi.com'}/reservations/${reservation.id}`,
    );
    const pdfResult = await this.documentService.generateAndUploadPDF(reservation);

    const updatedReservation = await this.prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        qrCodeUrl: qrResult.url,
        pdfUrl: pdfResult.url,
        etatPaiement: 'PENDING',
      },
      include: {
        medecinSousService: { include: { sousService: true } },
        paiement: true,
        statutReservation: true,
      },
    });

    return this.response.created(
      { paiement, reservation: updatedReservation, qrCode: qrResult, pdf: pdfResult },
      'Transaction initiée, veuillez compléter le paiement',
    );
  }

  async annulerTransaction(orderId: string, currentUser: any) {
    const paiement = await this.prisma.paiement.findFirst({
      where: { referenceTransaction: orderId },
      include: { reservation: { include: { statutReservation: true } } },
    });
    if (!paiement) {
      throw new NotFoundException(this.response.notFound('Transaction introuvable'));
    }

    if (
      paiement.reservation.idUtilisateur !== currentUser.id &&
      currentUser.privilege?.libelle !== 'Admin'
    ) {
      throw new ForbiddenException(this.response.forbidden('Annulation non autorisée'));
    }

    const cancelledStatut = await this.prisma.statutReservation.findFirst({
      where: { libelle: 'CANCELLED' },
    });
    if (!cancelledStatut) {
      throw new NotFoundException(this.response.notFound('Statut CANCELLED introuvable'));
    }

    const result = await this.naboo.deleteTransaction(orderId);

    await this.prisma.paiement.delete({
      where: { id: paiement.id, idReservation: paiement.idReservation },
    });

    await this.prisma.reservation.update({
      where: { id: paiement.idReservation },
      data: {
        idStatutReservation: cancelledStatut.id,
        etatPaiement: 'CANCELLED',
        qrCodeUrl: null,
        pdfUrl: null,
      },
    });

    return this.response.success(result, 'Transaction annulée');
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
      where: { id: paiement.id, idReservation: paiement.idReservation },
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
    } else if (body.transaction_status === 'FAILED' || body.transaction_status === 'CANCELLED') {
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

  async handleSuccess(orderId: string) {
    const paiement = await this.prisma.paiement.findFirst({
      where: { referenceTransaction: orderId },
    });
    if (!paiement) {
      throw new NotFoundException(this.response.notFound('Paiement introuvable'));
    }
    return this.response.success({ orderId, status: 'success' }, 'Paiement réussi (test)');
  }

  async handleError(orderId: string) {
    const paiement = await this.prisma.paiement.findFirst({
      where: { referenceTransaction: orderId },
    });
    if (!paiement) {
      throw new NotFoundException(this.response.notFound('Paiement introuvable'));
    }
    return this.response.success({ orderId, status: 'error' }, 'Paiement échoué (test)');
  }
}