import { Injectable, Inject, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileStorageService } from '../upload/interfaces/upload.interface';

@Injectable()
export class ServiceService {
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
        this.responseService.forbidden("Seuls les administrateurs peuvent effectuer cette action.");


    }
  }

  async create(createServiceDto: CreateServiceDto, file?: Express.Multer.File, currentUser?: any) {
    await this.verifyAdmin(currentUser);
    // Vérification si le libellé existe déjà
    const existingService = await this.prisma.service.findFirst({
      where: { libelle: createServiceDto.libelle, deletedAt: null },
    });

    if (existingService) {
      throw new ConflictException(this.responseService.conflict(`Un service avec le libellé "${createServiceDto.libelle}" existe déjà.`));
    }

    let iconUrl = createServiceDto.iconUrl;
    if (file) {
      const uploadResult = await this.uploadService.uploadSingle(file, 'services-icons');
      iconUrl = uploadResult.url;
    }
    const service = await this.prisma.service.create({ data: { libelle: createServiceDto.libelle, iconUrl } });
    return this.responseService.created(service, 'Service créé avec succès');
  }

  async findAll() {
    const services = await this.prisma.service.findMany({ where: { deletedAt: null } });
    return this.responseService.success(services, 'Liste des services récupérée');
  }

  async findOne(id: number) {
    const service = await this.prisma.service.findUnique({ where: { id, deletedAt: null } });
    if (!service) throw new ConflictException(this.responseService.conflict(`Service #${id} introuvable`));
    return this.responseService.success(service, 'Service récupéré');
  }

  async update(id: number, updateServiceDto: UpdateServiceDto, file?: Express.Multer.File) {
    let iconUrl = updateServiceDto.iconUrl;
    if (file) {
      const uploadResult = await this.uploadService.uploadSingle(file, 'services-icons');
      iconUrl = uploadResult.url;
    }
    const updatedService = await this.prisma.service.update({ where: { id }, data: { ...updateServiceDto, iconUrl } });
    return this.responseService.success(updatedService, 'Service mis à jour');
  }

  async remove(id: number) {
    await this.prisma.service.update({ where: { id }, data: { deletedAt: new Date() } });
    return this.responseService.success(null, 'Service supprimé (soft delete)');
  }
}
