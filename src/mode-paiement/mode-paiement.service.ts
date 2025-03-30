import { Injectable, Inject, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { FileStorageService } from '../upload/interfaces/upload.interface';
// @ts-ignore
import {CreateModePaiementDto} from './dto/create-mode-paiement.dto.';
import { UpdateModePaiementDto } from './dto/update-mode-paiement.dto';

@Injectable()
export class ModePaiementService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('UploadService') private readonly uploadService: FileStorageService,
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

  async create(dto: CreateModePaiementDto, file?: Express.Multer.File, currentUser?: any) {
    await this.verifyAdmin(currentUser);

    const existing = await this.prisma.modePaiement.findFirst({
      where: { libelle: dto.libelle, deletedAt: null },
    });
    if (existing) {
      throw new ConflictException(this.responseService.conflict(`Mode de paiement "${dto.libelle}" existe déjà.`));
    }

    let icon: string | undefined = dto.icon;
    if (file) {
      const uploaded = await this.uploadService.uploadSingle(file, 'mode-paiement-icons');
      icon = uploaded.url;
    }

    const created = await this.prisma.modePaiement.create({
      data: { libelle: dto.libelle, icon },
    });

    return this.responseService.created(created, 'Mode de paiement créé avec succès');
  }

  async findAll() {
    const modes = await this.prisma.modePaiement.findMany({ where: { deletedAt: null } });
    return this.responseService.success(modes, 'Liste des modes de paiement');
  }

  async findOne(id: number) {
    const mode = await this.prisma.modePaiement.findUnique({ where: { id, deletedAt: null } });
    if (!mode) throw new ConflictException(this.responseService.conflict(`Mode de paiement #${id} introuvable`));
    return this.responseService.success(mode, 'Mode de paiement récupéré');
  }

  async update(id: number, dto: UpdateModePaiementDto, file?: Express.Multer.File) {
    let icon = dto.icon;
    if (file) {
      const uploaded = await this.uploadService.uploadSingle(file, 'mode-paiement-icons');
      icon = uploaded.url;
    }

    const updated = await this.prisma.modePaiement.update({
      where: { id },
      data: {
        ...dto,
        icon,
      },
    });

    return this.responseService.success(updated, 'Mode de paiement mis à jour');
  }

  async remove(id: number) {
    await this.prisma.modePaiement.update({ where: { id }, data: { deletedAt: new Date() } });
    return this.responseService.success(null, 'Mode de paiement supprimé');
  }
}
