import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  Inject, BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { ChangePrivilegeDto } from './dto/change-privilege.dto';
import { ResponseService } from '../validation/exception/response/response.service';
import { FileStorageService } from '../upload/interfaces/upload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilisateurService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
    @Inject('UploadService') private readonly uploadService: FileStorageService,
  ) {}

  async create(
    createUtilisateurDto: CreateUtilisateurDto,
    currentUser?: any,
    file?: Express.Multer.File,
  ) {
    let idPrivilege = createUtilisateurDto.idPrivilege;

    if (!currentUser) {
      const privilegeClient = await this.prisma.privilege.findFirst({ where: { libelle: 'Client' } });
      if (!privilegeClient) {
        throw new NotFoundException(
          this.responseService.notFound(`Le privilège 'Client' n'existe pas. Contactez un administrateur.`),
        );
      }
      idPrivilege = privilegeClient.id;
    } else {
      const adminUser = await this.prisma.utilisateur.findFirst({
        where: { id: currentUser.id },
        include: { privilege: true },
      });

      if (!adminUser || adminUser.privilege?.libelle !== 'Admin') {
        throw new UnauthorizedException(
          this.responseService.forbidden("Seuls les administrateurs peuvent créer un utilisateur avec un privilège spécifique."),
        );
      }

      const privilege = await this.prisma.privilege.findUnique({ where: { id: idPrivilege } });
      if (!privilege) {
        throw new NotFoundException(
          this.responseService.notFound(`Le privilège #${idPrivilege} n'existe pas.`),
        );
      }
    }

    const existingEmail = await this.prisma.utilisateur.findUnique({ where: { email: createUtilisateurDto.email } });
    if (existingEmail) {
      throw new ConflictException(
        this.responseService.badRequest(['Cet email est déjà utilisé.'], 'Validation échouée'),
      );
    }

    const existingPhone = await this.prisma.utilisateur.findUnique({ where: { telephone: createUtilisateurDto.telephone } });
    if (existingPhone) {
      throw new ConflictException(
        this.responseService.badRequest(['Ce numéro de téléphone est déjà utilisé.'], 'Validation échouée'),
      );
    }

    const hashedPassword = await bcrypt.hash(createUtilisateurDto.password, 10);

    const privilege = await this.prisma.privilege.findUnique({ where: { id: idPrivilege } });

    let profilUrl: string | undefined;
    if (file) {
      const uploadResult = await this.uploadService.uploadSingle(file, 'profil-utilisateurs');
      profilUrl = uploadResult.url;
    }

    const data: any = {
      nom: createUtilisateurDto.nom,
      prenom: createUtilisateurDto.prenom,
      email: createUtilisateurDto.email,
      password: hashedPassword,
      telephone: createUtilisateurDto.telephone,
      idPrivilege,
      profil: privilege?.libelle,
    };

    if (profilUrl) data.profilUrl = profilUrl;

    const utilisateur = await this.prisma.utilisateur.create({ data });

    return this.responseService.created(utilisateur, 'Utilisateur créé avec succès');
  }

  async findAll() {
    const utilisateurs = await this.prisma.utilisateur.findMany({
      where: { deletedAt: null },
      include: { privilege: true },
    });

    return this.responseService.success(utilisateurs, 'Liste des utilisateurs récupérée');
  }

  async findOne(id: number) {
    const utilisateur = await this.prisma.utilisateur.findFirst({
      where: { id, deletedAt: null },
      include: { privilege: true },
    });

    if (!utilisateur) {
      throw new NotFoundException(
        this.responseService.notFound(`L'utilisateur #${id} n'existe pas ou a été supprimé`),
      );
    }

    return this.responseService.success(utilisateur, 'Utilisateur récupéré');
  }

  async update(
    id: number,
    updateUtilisateurDto: UpdateUtilisateurDto,
    file?: Express.Multer.File,
  ) {
    const existingUser = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!existingUser) throw new NotFoundException('Utilisateur non trouvé');
    if (
      !file &&
      !Object.values(updateUtilisateurDto).some((val) => val !== undefined)
    ) {
      throw new BadRequestException("Aucune donnée à mettre à jour.");
    }
    let profilUrl = existingUser.profilUrl;

    if (file) {
      // Supprimer l’ancienne image si elle existe
      if (profilUrl) {
        await this.uploadService.deleteFile(profilUrl);
      }
      const uploadResult = await this.uploadService.uploadSingle(file, 'profil-utilisateurs');
      profilUrl = uploadResult.url;
    }

    const data: any = {};
    if (updateUtilisateurDto.nom) data.nom = updateUtilisateurDto.nom;
    if (updateUtilisateurDto.prenom) data.prenom = updateUtilisateurDto.prenom;
    if (updateUtilisateurDto.email) data.email = updateUtilisateurDto.email;
    if (updateUtilisateurDto.password)
      data.password = await bcrypt.hash(updateUtilisateurDto.password, 10);
    if (updateUtilisateurDto.telephone) data.telephone = updateUtilisateurDto.telephone;
    if (updateUtilisateurDto.idPrivilege) data.idPrivilege = updateUtilisateurDto.idPrivilege;
    if (updateUtilisateurDto.profil) data.profil = updateUtilisateurDto.profil;
    if (profilUrl) data.profilUrl = profilUrl;

    const updatedUtilisateur = await this.prisma.utilisateur.update({
      where: { id },
      data,
      include: { privilege: true },
    });

    return this.responseService.success(updatedUtilisateur, 'Utilisateur mis à jour avec succès');
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.utilisateur.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return this.responseService.success(null, 'Utilisateur supprimé avec succès (soft delete)');
  }

  async changePrivilege(id: number, changePrivilegeDto: ChangePrivilegeDto) {
    await this.findOne(id);

    const privilege = await this.prisma.privilege.findUnique({
      where: { id: changePrivilegeDto.idPrivilege },
    });

    if (!privilege) {
      throw new NotFoundException(
        this.responseService.notFound(`Le privilège #${changePrivilegeDto.idPrivilege} n'existe pas.`),
      );
    }

    const updatedUtilisateur = await this.prisma.utilisateur.update({
      where: { id },
      data: {
        idPrivilege: changePrivilegeDto.idPrivilege,
        profil: privilege.libelle,
      },
      include: { privilege: true },
    });

    return this.responseService.success(updatedUtilisateur, 'Privilège mis à jour avec succès');
  }

  async findByEmail(email: string) {
    return this.prisma.utilisateur.findFirst({ where: { email } });
  }
  async findAllWithoutAdminsAndClients() {
    const utilisateurs = await this.prisma.utilisateur.findMany({
      where: {
        deletedAt: null,
        NOT: {
          privilege: {
            libelle: {
              in: ['Client', 'Admin'],
            },
          },
        },
      },
      include: { privilege: true },
    });

    return this.responseService.success(
      utilisateurs,
      "Liste des utilisateurs sans privilèges 'Client' et 'Admin' récupérée",
    );
  }

  async findAllClients() {
    const utilisateurs = await this.prisma.utilisateur.findMany({
      where: {
        deletedAt: null,
        privilege: {
          libelle: 'Client',
        },
      },
      include: { privilege: true },
    });

    return this.responseService.success(utilisateurs, 'Liste des utilisateurs avec le privilège Client');
  }

}
