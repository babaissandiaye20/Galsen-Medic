import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { CreateDeviseDto } from './dto/create-devise.dto';
import { UpdateDeviseDto } from './dto/update-devise.dto';

@Injectable()
export class DeviseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  /**
   * ✅ Créer une devise et désactiver les autres si elle est active
   */
  async create(createDeviseDto: CreateDeviseDto) {
    const existingDevise = await this.prisma.devise.findUnique({
      where: { code: createDeviseDto.code },
    });

    if (existingDevise) {
      throw new BadRequestException('Une devise avec ce code existe déjà.');
    }

    return await this.prisma.$transaction(async (prisma) => {
      // Si la nouvelle devise est active, désactiver les autres
      if (createDeviseDto.actif) {
        await prisma.devise.updateMany({
          where: { actif: true },
          data: { actif: false },
        });
      }

      // Créer la nouvelle devise
      const devise = await prisma.devise.create({
        data: {
          code: createDeviseDto.code,
          libelle: createDeviseDto.libelle,
          symbole: createDeviseDto.symbole,
          actif: createDeviseDto.actif ?? true, // Actif par défaut
        },
      });

      return this.responseService.created(devise, 'Devise créée avec succès et activée.');
    });
  }

  /**
   * ✅ Récupérer toutes les devises actives
   */
  async findAll() {
    const devises = await this.prisma.devise.findMany();
    return this.responseService.success(devises, 'Toutes les devises récupérées');
  }

  /**
   * ✅ Récupérer une devise par ID
   */
  async findById(id: number) {
    const devise = await this.prisma.devise.findUnique({ where: { id } });

    if (!devise) {
      throw new NotFoundException(this.responseService.notFound(`Devise #${id} non trouvée.`));
    }

    return this.responseService.success(devise, 'Devise récupérée');
  }

  /**
   * ✅ Mettre à jour une devise (sans activer)
   */
  async update(id: number, updateDeviseDto: UpdateDeviseDto) {
    await this.findById(id);

    const updatedDevise = await this.prisma.devise.update({
      where: { id },
      data: updateDeviseDto,
    });

    return this.responseService.success(updatedDevise, 'Devise mise à jour avec succès');
  }

  /**
   * ✅ Activer une devise et désactiver toutes les autres
   */
  async activate(id: number) {
    const devise = await this.findById(id);

    return await this.prisma.$transaction(async (prisma) => {
      // Désactiver toutes les autres devises
      await prisma.devise.updateMany({
        where: { actif: true },
        data: { actif: false },
      });

      // Activer la nouvelle devise
      const activatedDevise = await prisma.devise.update({
        where: { id },
        data: { actif: true },
      });

      return this.responseService.success(activatedDevise, 'Devise activée avec succès.');
    });
  }

  /**
   * ✅ Supprimer une devise (soft delete)
   */
  async delete(id: number) {
    await this.findById(id);

    await this.prisma.devise.update({
      where: { id },
      data: { actif: false, deletedAt: new Date() },
    });

    return this.responseService.success(null, 'Devise supprimée avec succès');
  }
}
