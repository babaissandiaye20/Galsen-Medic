import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { CreateStatutReservationDto } from './dto/create-statut-reservation.dto';
import { UpdateStatutReservationDto } from './dto/update-statut-reservation.dto';

@Injectable()
export class StatutReservationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  private async verifyAdmin(currentUser: any) {
    if (!currentUser) throw new UnauthorizedException("Non autorisé.");
    const user = await this.prisma.utilisateur.findFirst({
      where: { id: currentUser.id },
      include: { privilege: true },
    });
    if (!user || user.privilege?.libelle !== 'Admin') {
      this.responseService.forbidden("Seuls les administrateurs peuvent effectuer cette action.");
    }
  }

  async create(dto: CreateStatutReservationDto, currentUser: any) {
    await this.verifyAdmin(currentUser);
    const existing = await this.prisma.statutReservation.findFirst({
      where: { libelle: dto.libelle, deletedAt: null },
    });

    if (existing) {
      throw new ConflictException(this.responseService.conflict("Ce statut existe déjà."));
    }

    const created = await this.prisma.statutReservation.create({ data: dto });
    return this.responseService.created(created, "Statut créé");
  }

  async findAll() {
    const list = await this.prisma.statutReservation.findMany({ where: { deletedAt: null } });
    return this.responseService.success(list);
  }

  async findOne(id: number) {
    const item = await this.prisma.statutReservation.findUnique({ where: { id, deletedAt: null } });
    return this.responseService.success(item);
  }

  async update(id: number, dto: UpdateStatutReservationDto) {
    const updated = await this.prisma.statutReservation.update({
      where: { id },
      data: dto,
    });
    return this.responseService.success(updated, "Mis à jour");
  }

  async remove(id: number) {
    await this.prisma.statutReservation.update({ where: { id }, data: { deletedAt: new Date() } });
    return this.responseService.success(null, "Supprimé (soft)");
  }
}
