import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// @ts-ignore
import { CreateMedecinSousServiceDto } from './dto/create-medecin-sous-service.dto';
// @ts-ignore
import { UpdateMedecinSousServiceDto } from './dto/update-medecin-sous-service.dto';
import { ResponseService } from '../validation/exception/response/response.service';

@Injectable()
export class MedecinSousServiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  // ✅ Création d'un médecin sous service
  async create(dto: CreateMedecinSousServiceDto, currentUser: any) {
    const sousService = await this.prisma.sousService.findUnique({
      where: { id: dto.idSousService },
    });

    if (!sousService) {
      throw new NotFoundException(
        this.responseService.notFound(`Le sous-service #${dto.idSousService} n'existe pas.`)
      );
    }

    const user = await this.prisma.utilisateur.findUnique({
      where: { id: currentUser.id },
      include: { privilege: true },
    });

    if (!user) {
      throw new UnauthorizedException(
        this.responseService.forbidden("Utilisateur non trouvé.")
      );
    }

    if (user.privilege.libelle !== 'Admin' && currentUser.id !== dto.idMedecin) {
      throw new UnauthorizedException(
        this.responseService.forbidden('Seul un administrateur ou le médecin lui-même peut ajouter un sous-service.')
      );
    }

    const medecin = await this.prisma.utilisateur.findUnique({
      where: { id: dto.idMedecin },
      include: { privilege: true },
    });

    if (!medecin || medecin.privilege.libelle !== 'Medecin') {
      throw new UnauthorizedException(
        this.responseService.forbidden("L'utilisateur spécifié n'est pas un médecin.")
      );
    }

    const existing = await this.prisma.medecinSousService.findFirst({
      where: {
        idMedecin: dto.idMedecin,
        idSousService: dto.idSousService,
        deletedAt: null,
      },
    });

    if (existing) {
      throw new UnauthorizedException(
        this.responseService.forbidden('Ce médecin est déjà associé à ce sous-service.')
      );
    }

    const created = await this.prisma.medecinSousService.create({
      data: {
        idMedecin: dto.idMedecin,
        idSousService: dto.idSousService,
      },
    });

    return this.responseService.created(created, 'Médecin sous-service ajouté avec succès');
  }

  // ✅ Liste des médecins sous service
  async findAll() {
    const data = await this.prisma.medecinSousService.findMany({
      where: { deletedAt: null },
      include: { medecin: true, sousService: true },
    });

    return this.responseService.success(data, 'Liste des médecins sous-services récupérée');
  }

  // ✅ Récupérer un médecin sous service par ID
  async findOne(id: number) {
    const data = await this.prisma.medecinSousService.findFirst({
      where: { id, deletedAt: null },
      include: { medecin: true, sousService: true },
    });

    if (!data) {
      throw new NotFoundException(
        this.responseService.notFound(`Le médecin sous-service #${id} n'existe pas ou a été supprimé.`)
      );
    }

    return this.responseService.success(data, 'Médecin sous-service récupéré');
  }

  // ✅ Mise à jour d'un médecin sous service
  async update(id: number, dto: UpdateMedecinSousServiceDto, currentUser: any) {
    const existing = await this.prisma.medecinSousService.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existing) {
      throw new NotFoundException(
        this.responseService.notFound(`Le médecin sous-service #${id} n'existe pas ou a été supprimé.`)
      );
    }

    const user = await this.prisma.utilisateur.findUnique({
      where: { id: currentUser.id },
      include: { privilege: true },
    });

    if (!user) {
      throw new UnauthorizedException(
        this.responseService.forbidden("Utilisateur non trouvé.")
      );
    }

    if (
      user.privilege.libelle !== 'Admin' &&
      currentUser.id !== existing.idMedecin
    ) {
      throw new UnauthorizedException(
        this.responseService.forbidden("Seul un administrateur ou le médecin concerné peut modifier ce sous-service.")
      );
    }

    const updated = await this.prisma.medecinSousService.update({
      where: { id },
      data: dto,
    });

    return this.responseService.success(updated, 'Médecin sous-service mis à jour avec succès');
  }

  // ✅ Suppression d'un médecin sous service (soft delete)
  async remove(id: number, currentUser: any) {
    const existing = await this.prisma.medecinSousService.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existing) {
      throw new NotFoundException(
        this.responseService.notFound(`Le médecin sous-service #${id} n'existe pas ou a été supprimé.`)
      );
    }

    const user = await this.prisma.utilisateur.findUnique({
      where: { id: currentUser.id },
      include: { privilege: true },
    });

    if (!user) {
      throw new UnauthorizedException(
        this.responseService.forbidden("Utilisateur non trouvé.")
      );
    }

    if (
      user.privilege.libelle !== 'Admin' &&
      currentUser.id !== existing.idMedecin
    ) {
      throw new UnauthorizedException(
        this.responseService.forbidden("Seul un administrateur ou le médecin concerné peut supprimer ce sous-service.")
      );
    }

    await this.prisma.medecinSousService.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return this.responseService.success(null, 'Médecin sous-service supprimé avec succès (soft delete)');
  }
}
