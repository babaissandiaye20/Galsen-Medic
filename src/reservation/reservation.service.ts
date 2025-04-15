import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    private prisma: PrismaService,
    private response: ResponseService,
  ) {}

  async create(dto: CreateReservationDto, currentUser: any) {
    const utilisateur = await this.prisma.utilisateur.findUnique({ where: { id: currentUser.id } });
    if (!utilisateur) throw new NotFoundException(this.response.notFound('Utilisateur introuvable'));

    const medecinSousService = await this.prisma.medecinSousService.findUnique({
      where: { id: dto.idMedecinSousService },
      include: {
        disponibilites: true,
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
    });

    if (!medecinSousService) throw new NotFoundException(this.response.notFound('Médecin ou sous-service introuvable'));

    const statut = await this.prisma.statutReservation.findUnique({
      where: { id: dto.idStatutReservation },
    });

    if (!statut || statut.libelle !== 'PENDING')
      throw new ConflictException(this.response.conflict('Statut initial doit être PENDING'));

    const date = new Date(dto.date);
    const jourSemaine = date.toLocaleString('fr-FR', { weekday: 'long' }).toLowerCase();
    const { heureDebut, heureFin } = dto;

    const dispo = medecinSousService.disponibilites.find(d =>
      d.jourSemaine.toLowerCase() === jourSemaine &&
      d.heureDebut <= heureDebut &&
      d.heureFin >= heureFin
    );

    if (!dispo) throw new ConflictException(this.response.conflict('Médecin non disponible ce jour ou heure'));

    const chevauchement = await this.prisma.reservation.findFirst({
      where: {
        idMedecinSousService: dto.idMedecinSousService,
        date: date,
        OR: [
          { heureDebut: { lte: heureFin }, heureFin: { gte: heureDebut } },
        ],
      },
    });

    if (chevauchement) throw new ConflictException(this.response.conflict('Créneau déjà réservé'));

    const reservation = await this.prisma.reservation.create({
      data: {
        idUtilisateur: currentUser.id,
        idMedecinSousService: dto.idMedecinSousService,
        idStatutReservation: dto.idStatutReservation,
        typeConsultation: dto.typeConsultation,
        date,
        heureDebut,
        heureFin,
        etatPaiement: 'PENDING',
      },
      include: {
        medecinSousService: true,
        statutReservation: true,
      },
    });

    return this.response.created(reservation, 'Réservation enregistrée');
  }

  async findAll(currentUser: any) {
    const where = currentUser.privilege?.libelle === 'Admin'
      ? {}
      : { idUtilisateur: currentUser.id };

    const list = await this.prisma.reservation.findMany({
      where,
      include: {
        medecinSousService: {
          include: { medecin: true, sousService: true },
        },
        paiement: true,
        statutReservation: true,
      },
    });

    return this.response.success(list, 'Liste des réservations');
  }

  async findOne(id: number, currentUser: any) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        medecinSousService: { include: { medecin: true, sousService: true } },
        paiement: true,
        statutReservation: true,
      },
    });

    if (!reservation) throw new NotFoundException(this.response.notFound('Réservation non trouvée'));

    if (reservation.idUtilisateur !== currentUser.id && currentUser.privilege?.libelle !== 'Admin') {
      throw new ForbiddenException(this.response.forbidden('Accès interdit'));
    }

    return this.response.success(reservation, 'Réservation trouvée');
  }

  async findByPatient(idUtilisateur: number) {
    const list = await this.prisma.reservation.findMany({
      where: { idUtilisateur },
      include: {
        medecinSousService: { include: { medecin: true, sousService: true } },
        statutReservation: true,
        paiement: true,
      },
    });

    return this.response.success(list, 'Réservations du patient');
  }

  async findByMedecin(idMedecin: number) {
    const list = await this.prisma.reservation.findMany({
      where: {
        medecinSousService: {
          medecin: { id: idMedecin },
        },
      },
      include: {
        medecinSousService: { include: { medecin: true, sousService: true } },
        paiement: true,
        statutReservation: true,
      },
    });

    return this.response.success(list, 'Réservations du médecin');
  }

  async cancel(id: number, currentUser: any) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: { statutReservation: true, paiement: true },
    });

    if (!reservation) throw new NotFoundException(this.response.notFound('Réservation introuvable'));

    if (reservation.idUtilisateur !== currentUser.id && currentUser.privilege?.libelle !== 'Admin') {
      throw new ForbiddenException(this.response.forbidden('Accès interdit'));
    }

    const cancelledStatut = await this.prisma.statutReservation.findFirst({
      where: { libelle: 'CANCELLED' },
    });

    if (!cancelledStatut) {
      throw new NotFoundException(this.response.notFound('Statut CANCELLED introuvable'));
    }
    const updated = await this.prisma.reservation.update({
      where: { id },
      data: {
        idStatutReservation: cancelledStatut.id,
        etatPaiement: 'CANCELLED',
        qrCodeUrl: null,
        pdfUrl: null,
      },
    });

    return this.response.success(updated, 'Réservation annulée');
  }
}
