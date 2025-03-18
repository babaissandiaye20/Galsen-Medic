import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { CreateSousServiceDto } from './dto/create-sous-service.dto';
import { UpdateSousServiceDto } from './dto/update-sous-service.dto';
import { FileStorageService } from '../upload/interfaces/upload.interface';

@Injectable()
export class SousServiceService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('UploadService') private readonly uploadService: FileStorageService, // Injection avec token
    private readonly responseService: ResponseService
  ) {}

  private async verifyAdmin(currentUser: any) {
    if (!currentUser) throw new UnauthorizedException("Non autorisé.");
    const user = await this.prisma.utilisateur.findFirst({
      where: { id: currentUser.id },
      include: { privilege: true },
    });
    if (!user || user.privilege?.libelle !== 'Admin') {
      throw new UnauthorizedException("Seuls les administrateurs peuvent créer un sous-service.");
    }
  }

  async create(createSousServiceDto: CreateSousServiceDto, file?: Express.Multer.File, currentUser?: any) {
    await this.verifyAdmin(currentUser);
    let iconUrl = createSousServiceDto.iconUrl;
    if (file) {
      const uploadResult = await this.uploadService.uploadSingle(file, 'sous-services-icons');
      iconUrl = uploadResult.url;
    }
    const sousService = await this.prisma.sousService.create({ data: { ...createSousServiceDto, iconUrl } });
    return this.responseService.created(sousService, 'Sous-service créé avec succès');
  }

  async findOne(id: number) {
    const sousService = await this.prisma.sousService.findUnique({ where: { id, deletedAt: null } });
    if (!sousService) throw new NotFoundException(this.responseService.notFound(`Sous-service #${id} introuvable`));
    return this.responseService.success(sousService, 'Sous-service récupéré');
  }

  async update(id: number, updateSousServiceDto: UpdateSousServiceDto, file?: Express.Multer.File) {
    let iconUrl = updateSousServiceDto.iconUrl;
    if (file) {
      const uploadResult = await this.uploadService.uploadSingle(file, 'sous-services-icons');
      iconUrl = uploadResult.url;
    }
    const updatedSousService = await this.prisma.sousService.update({ where: { id }, data: { ...updateSousServiceDto, iconUrl } });
    return this.responseService.success(updatedSousService, 'Sous-service mis à jour');
  }

  async remove(id: number) {
    await this.prisma.sousService.update({ where: { id }, data: { deletedAt: new Date() } });
    return this.responseService.success(null, 'Sous-service supprimé (soft delete)');
  }
}
