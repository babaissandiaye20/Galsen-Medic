import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service';
import { CreateTarifDto } from './dto/create-tarif.dto';
import { UpdateTarifDto } from './dto/update-tarif.dto';

@Injectable()
export class TarifService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  async create(createTarifDto: CreateTarifDto) {
    try {
      const sousService = await this.prisma.sousService.findUnique({
        where: { id: createTarifDto.idSousService },
      });

      if (!sousService) {
        return this.responseService.badRequest([`Sous-service #${createTarifDto.idSousService} non trouvé.`]);
      }

      const devise = await this.prisma.devise.findUnique({
        where: { id: createTarifDto.idDevise },
      });

      if (!devise) {
        return this.responseService.badRequest([`Devise #${createTarifDto.idDevise} non trouvée.`]);
      }

      const existingTarif = await this.prisma.tarif.findFirst({
        where: {
          idSousService: createTarifDto.idSousService,
          idDevise: createTarifDto.idDevise,
          montant: createTarifDto.montant,
          deletedAt: null,
        },
      });

      if (existingTarif) {
        return this.responseService.badRequest([
          `Un tarif avec le montant ${createTarifDto.montant} existe déjà pour ce sous-service et cette devise.`,
        ]);
      }

      return await this.prisma.$transaction(async (prisma) => {
        if (createTarifDto.actif) {
          await prisma.tarif.updateMany({
            where: {
              idSousService: createTarifDto.idSousService,
              idDevise: createTarifDto.idDevise,
              actif: true,
            },
            data: { actif: false },
          });
        }

        const tarif = await prisma.tarif.create({
          data: {
            idSousService: createTarifDto.idSousService,
            idDevise: createTarifDto.idDevise,
            montant: createTarifDto.montant,
            actif: createTarifDto.actif ?? true,
          },
          include: {
            sousService: true,
            devise: true,
          },
        });

        return this.responseService.created(tarif, 'Tarif créé avec succès.');
      });
    } catch (error) {
      return this.responseService.error(error.message);
    }
  }

  async findAll() {
    try {
      const tarifs = await this.prisma.tarif.findMany({
        include: {
          sousService: true,
          devise: true,
        },
      });
      return this.responseService.success(tarifs, 'Tous les tarifs récupérés');
    } catch (error) {
      return this.responseService.error(error.message);
    }
  }

  async findAllBySousService(idSousService: number) {
    try {
      const sousService = await this.prisma.sousService.findUnique({
        where: { id: idSousService },
      });

      if (!sousService) {
        return this.responseService.badRequest([`Sous-service #${idSousService} non trouvé.`]);
      }

      const tarifs = await this.prisma.tarif.findMany({
        where: {
          idSousService,
          actif: true,
        },
        include: {
          devise: true,
        },
      });

      return this.responseService.success(tarifs, `Tarifs actifs pour le sous-service #${idSousService} récupérés`);
    } catch (error) {
      return this.responseService.error(error.message);
    }
  }

  async findAllBySousServiceFull(idSousService: number) {
    try {
      const sousService = await this.prisma.sousService.findUnique({
        where: { id: idSousService },
      });

      if (!sousService) {
        return this.responseService.badRequest([`Sous-service #${idSousService} non trouvé.`]);
      }

      const tarifs = await this.prisma.tarif.findMany({
        where: {
          idSousService,
          deletedAt: null,
        },
        include: {
          devise: true,
        },
      });

      return this.responseService.success(tarifs, `Tous les tarifs (actifs et inactifs) pour le sous-service #${idSousService}`);
    } catch (error) {
      return this.responseService.error(error.message);
    }
  }

  async findById(id: number) {
    try {
      const tarif = await this.prisma.tarif.findUnique({
        where: { id },
        include: {
          sousService: true,
          devise: true,
        },
      });

      if (!tarif) {
        return this.responseService.notFound(`Tarif #${id} non trouvé.`);
      }

      return this.responseService.success(tarif, 'Tarif récupéré');
    } catch (error) {
      return this.responseService.error(error.message);
    }
  }

  async update(id: number, updateTarifDto: UpdateTarifDto) {
    try {
      const tarifExisting = await this.prisma.tarif.findUnique({
        where: { id },
      });

      if (!tarifExisting) {
        return this.responseService.notFound(`Tarif #${id} non trouvé.`);
      }

      return await this.prisma.$transaction(async (prisma) => {
        if (updateTarifDto.actif) {
          await prisma.tarif.updateMany({
            where: {
              id: { not: id },
              idSousService: updateTarifDto.idSousService || tarifExisting.idSousService,
              idDevise: updateTarifDto.idDevise || tarifExisting.idDevise,
              actif: true,
            },
            data: { actif: false },
          });
        }

        const updatedTarif = await prisma.tarif.update({
          where: { id },
          data: updateTarifDto,
          include: {
            sousService: true,
            devise: true,
          },
        });

        return this.responseService.success(updatedTarif, 'Tarif mis à jour avec succès');
      });
    } catch (error) {
      return this.responseService.error(error.message);
    }
  }

  async activate(id: number) {
    try {
      const tarif = await this.prisma.tarif.findUnique({
        where: { id },
      });

      if (!tarif) {
        return this.responseService.notFound(`Tarif #${id} non trouvé.`);
      }

      return await this.prisma.$transaction(async (prisma) => {
        await prisma.tarif.updateMany({
          where: {
            id: { not: id },
            idSousService: tarif.idSousService,
            idDevise: tarif.idDevise,
            actif: true,
          },
          data: { actif: false },
        });

        const activatedTarif = await prisma.tarif.update({
          where: { id },
          data: { actif: true },
          include: {
            sousService: true,
            devise: true,
          },
        });

        return this.responseService.success(activatedTarif, 'Tarif activé avec succès.');
      });
    } catch (error) {
      return this.responseService.error(error.message);
    }
  }

  async delete(id: number) {
    try {
      const tarif = await this.prisma.tarif.findUnique({
        where: { id },
      });

      if (!tarif) {
        return this.responseService.notFound(`Tarif #${id} non trouvé.`);
      }

      await this.prisma.tarif.update({
        where: { id },
        data: { actif: false, deletedAt: new Date() },
      });

      return this.responseService.success(null, 'Tarif supprimé avec succès');
    } catch (error) {
      return this.responseService.error(error.message);
    }
  }
  async deactivate(id: number) {
    try {
      const tarif = await this.prisma.tarif.findUnique({
        where: { id },
      });

      if (!tarif) {
        return this.responseService.notFound(`Tarif #${id} non trouvé.`);
      }

      if (!tarif.actif) {
        return this.responseService.badRequest([`Le tarif #${id} est déjà inactif.`]);
      }

      const updated = await this.prisma.tarif.update({
        where: { id },
        data: { actif: false },
        include: {
          sousService: true,
          devise: true,
        },
      });

      return this.responseService.success(updated, 'Tarif désactivé avec succès.');
    } catch (error) {
      return this.responseService.error(error.message);
    }
  }

}
