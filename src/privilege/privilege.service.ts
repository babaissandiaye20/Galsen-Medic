import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { ResponseService } from '../validation/exception/response/response.service';

@Injectable()
export class PrivilegeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  // ✅ Vérification de l'admin
  private async verifyAdmin(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException("Vous devez être connecté pour effectuer cette action.");
    }

    const user = await this.prisma.utilisateur.findFirst({
      where: { id: currentUser.id },
      include: { privilege: true },
    });

    if (!user || user.privilege?.libelle !== 'Admin') {
      throw new UnauthorizedException("Seuls les administrateurs peuvent effectuer cette action.");
    }
  }

  async create(createPrivilegeDto: CreatePrivilegeDto, currentUser: any) {
    await this.verifyAdmin(currentUser); // ✅ Vérification Admin

    const existingPrivilege = await this.prisma.privilege.findUnique({
      where: { libelle: createPrivilegeDto.libelle },
    });

    if (existingPrivilege) {
      throw new ConflictException(
        this.responseService.badRequest(
          ['Le libellé du privilège doit être unique'],
          'Validation échouée'
        )
      );
    }

    const privilege = await this.prisma.privilege.create({
      data: createPrivilegeDto,
    });

    return this.responseService.created(privilege, 'Privilège créé avec succès');
  }

  async findAll(currentUser: any) {
    await this.verifyAdmin(currentUser); // ✅ Vérification Admin

    const privileges = await this.prisma.privilege.findMany({
      where: { deletedAt: null },
    });

    return this.responseService.success(privileges, 'Liste des privilèges récupérée');
  }

  async findOne(id: number, currentUser: any) {
    await this.verifyAdmin(currentUser); // ✅ Vérification Admin

    const privilege = await this.prisma.privilege.findFirst({
      where: { id, deletedAt: null },
    });

    if (!privilege) {
      throw new NotFoundException(
        this.responseService.notFound(`Le privilège #${id} n'existe pas ou a été supprimé`)
      );
    }

    return this.responseService.success(privilege, 'Privilège récupéré');
  }

  async update(id: number, updatePrivilegeDto: UpdatePrivilegeDto, currentUser: any) {
    await this.verifyAdmin(currentUser); // ✅ Vérification Admin

    const privilege = await this.prisma.privilege.findFirst({
      where: { id, deletedAt: null },
    });

    if (!privilege) {
      throw new NotFoundException(
        this.responseService.notFound(`Le privilège #${id} n'existe pas ou a été supprimé`)
      );
    }

    if (updatePrivilegeDto.libelle) {
      const existingPrivilege = await this.prisma.privilege.findUnique({
        where: { libelle: updatePrivilegeDto.libelle },
      });

      if (existingPrivilege && existingPrivilege.id !== id) {
        throw new ConflictException(
          this.responseService.badRequest(
            ['Le libellé du privilège doit être unique'],
            'Validation échouée'
          )
        );
      }
    }

    const updatedPrivilege = await this.prisma.privilege.update({
      where: { id },
      data: updatePrivilegeDto,
    });

    return this.responseService.success(updatedPrivilege, 'Privilège mis à jour avec succès');
  }

  async remove(id: number, currentUser: any) {
    await this.verifyAdmin(currentUser); // ✅ Vérification Admin

    const privilege = await this.prisma.privilege.findFirst({
      where: { id, deletedAt: null },
    });

    if (!privilege) {
      throw new NotFoundException(
        this.responseService.notFound(`Le privilège #${id} n'existe pas ou a déjà été supprimé`)
      );
    }

    await this.prisma.privilege.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return this.responseService.success(null, 'Privilège supprimé avec succès (soft delete)');
  }
}
