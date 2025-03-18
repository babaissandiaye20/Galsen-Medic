import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { ChangePrivilegeDto } from './dto/change-privilege.dto';
import { ResponseService } from '../validation/exception/response/response.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilisateurService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  async create(createUtilisateurDto: CreateUtilisateurDto, currentUser?: any) {
    let idPrivilege = createUtilisateurDto.idPrivilege;

    if (!currentUser) {
      // ✅ Si l'utilisateur n'est pas authentifié, il est assigné au privilège "Client"
      const privilegeClient = await this.prisma.privilege.findFirst({
        where: { libelle: 'Client' },
      });

      if (!privilegeClient) {
        throw new NotFoundException(
          this.responseService.notFound(`Le privilège 'Client' n'existe pas. Contactez un administrateur.`)
        );
      }

      idPrivilege = privilegeClient.id; // Affectation automatique au privilège "Client"
    } else {
      // ✅ Vérifier que l'utilisateur authentifié est un admin avant d'autoriser la création
      const adminUser = await this.prisma.utilisateur.findFirst({
        where: { id: currentUser.id },
        include: { privilege: true },
      });

      if (!adminUser || adminUser.privilege?.libelle !== 'Admin') {
        throw new UnauthorizedException(
          this.responseService.forbidden("Seuls les administrateurs peuvent créer un utilisateur avec un privilège spécifique.")
        );
      }

      // Vérifier si le privilège spécifié existe
      const privilege = await this.prisma.privilege.findUnique({
        where: { id: idPrivilege },
      });

      if (!privilege) {
        throw new NotFoundException(
          this.responseService.notFound(`Le privilège #${idPrivilege} n'existe pas.`)
        );
      }
    }

    // ✅ Vérifier si l'email existe déjà
    const existingEmail = await this.prisma.utilisateur.findUnique({
      where: { email: createUtilisateurDto.email },
    });

    if (existingEmail) {
      throw new ConflictException(
        this.responseService.badRequest(
          ['Cet email est déjà utilisé.'],
          'Validation échouée'
        )
      );
    }

    // ✅ Vérifier si le téléphone existe déjà
    const existingPhone = await this.prisma.utilisateur.findUnique({
      where: { telephone: createUtilisateurDto.telephone }, // ✅ Téléphone est maintenant unique dans Prisma
    });

    if (existingPhone) {
      throw new ConflictException(
        this.responseService.badRequest(
          ['Ce numéro de téléphone est déjà utilisé.'],
          'Validation échouée'
        )
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(createUtilisateurDto.password, 10);

    // ✅ Récupération du privilège avant de l'utiliser
    const privilege = await this.prisma.privilege.findUnique({
      where: { id: idPrivilege },
    });

    if (!privilege) {
      throw new NotFoundException(
        this.responseService.notFound(`Le privilège #${idPrivilege} n'existe pas.`)
      );
    }

    // ✅ Création de l'utilisateur avec la vérification du téléphone
    const utilisateur = await this.prisma.utilisateur.create({
      data: {
        nom: createUtilisateurDto.nom,
        prenom: createUtilisateurDto.prenom,
        email: createUtilisateurDto.email,
        password: hashedPassword,
        telephone: createUtilisateurDto.telephone,
        idPrivilege: idPrivilege,
        profil: privilege.libelle, // ✅ Profil basé sur le privilège
      },
    });

    return this.responseService.created(utilisateur, 'Utilisateur créé avec succès');
  }



  async findAll() {
    const utilisateurs = await this.prisma.utilisateur.findMany({
      where: { deletedAt: null },
      include: { privilege: true }, // Inclure le privilège pour afficher le profil
    });

    return this.responseService.success(utilisateurs, 'Liste des utilisateurs récupérée');
  }

  async findOne(id: number) {
    const utilisateur = await this.prisma.utilisateur.findFirst({
      where: { id, deletedAt: null },
      include: { privilege: true }, // Inclure le privilège pour afficher le profil
    });

    if (!utilisateur) {
      throw new NotFoundException(
        this.responseService.notFound(`L'utilisateur #${id} n'existe pas ou a été supprimé`)
      );
    }

    return this.responseService.success(utilisateur, 'Utilisateur récupéré');
  }

  async update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    await this.findOne(id);

    const updatedUtilisateur = await this.prisma.utilisateur.update({
      where: { id },
      data: updateUtilisateurDto,
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

    // Vérifier si le privilège existe
    const privilege = await this.prisma.privilege.findUnique({
      where: { id: changePrivilegeDto.idPrivilege },
    });

    if (!privilege) {
      throw new NotFoundException(
        this.responseService.notFound(`Le privilège #${changePrivilegeDto.idPrivilege} n'existe pas.`)
      );
    }

    // Mise à jour du privilège et du profil
    const updatedUtilisateur = await this.prisma.utilisateur.update({
      where: { id },
      data: {
        idPrivilege: changePrivilegeDto.idPrivilege,
        profil: privilege.libelle, // 👈 Mettre à jour automatiquement le profil
      },
      include: { privilege: true },
    });

    return this.responseService.success(updatedUtilisateur, 'Privilège mis à jour avec succès');
  }

  async findByEmail(email: string) {
    return this.prisma.utilisateur.findFirst({ where: { email } });
  }
}
