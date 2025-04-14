import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { ResponseService } from '../validation/exception/response/response.service';

@Injectable()
export class PaiementService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  async create(dto: CreatePaiementDto, currentUser: any) {
    if (!currentUser) {
      throw new ForbiddenException(this.responseService.forbidden("Vous devez être connecté."));
    }

    const reservation = await this.prisma.reservation.findUnique({
      where: { id: dto.idReservation },
    });

    if (!reservation) {
      throw new NotFoundException(this.responseService.notFound("Réservation introuvable."));
    }

    const existingPaiement = await this.prisma.paiement.findUnique({
      where: { idReservation: dto.idReservation },
    });

    if (existingPaiement) {
      throw new ConflictException(this.responseService.conflict("Un paiement existe déjà pour cette réservation."));
    }

    const paiement = await this.prisma.paiement.create({
      data: {
        idReservation: dto.idReservation,
        montant: dto.montant,
        idModePaiement: dto.idModePaiement,
        referenceTransaction: `SIM-${Date.now()}`,
        qrCodeUrl: 'https://dummy.qr.code/url',
        paiementUrl: 'https://dummy.payment.link',
        etatTransaction: dto.etatTransaction ?? 'SUCCES',
      },
    });

    return this.responseService.created(paiement, "Paiement créé avec succès.");
  }

  async findAll() {
    const paiements = await this.prisma.paiement.findMany({
      where: { deletedAt: null },
      include: {
        modePaiement: true,
        reservation: true,
      },
    });

    return this.responseService.success(paiements, "Liste des paiements récupérée.");
  }

  async findById(id: number) {
    const paiement = await this.prisma.paiement.findUnique({
      where: { id },
      include: {
        modePaiement: true,
        reservation: true,
      },
    });

    if (!paiement) {
      throw new NotFoundException(this.responseService.notFound(`Paiement #${id} introuvable.`));
    }

    return this.responseService.success(paiement, "Paiement récupéré.");
  }

  async update(id: number, dto: UpdatePaiementDto, currentUser: any) {
    const paiement = await this.prisma.paiement.findUnique({ where: { id } });

    if (!paiement) {
      throw new NotFoundException(this.responseService.notFound("Paiement introuvable."));
    }

    const updated = await this.prisma.paiement.update({
      where: { id },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });

    return this.responseService.success(updated, "Paiement mis à jour.");
  }

  async remove(id: number) {
    const paiement = await this.prisma.paiement.findUnique({ where: { id } });

    if (!paiement) {
      throw new NotFoundException(this.responseService.notFound("Paiement introuvable."));
    }

    await this.prisma.paiement.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return this.responseService.success(null, "Paiement supprimé.");
  }
}
