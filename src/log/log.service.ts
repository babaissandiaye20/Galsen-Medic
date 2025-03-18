import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../validation/exception/response/response.service'; // adaptez le chemin selon votre arborescence

@Injectable()
export class LogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  // Méthode utilisée par le middleware Prisma pour créer un log
  async createLog(payload: { idUtilisateur: number; action: string; ip: string; details?: any }) {
    await this.prisma.log.create({
      data: {
        idUtilisateur: payload.idUtilisateur,
        action: payload.action,
        ip: payload.ip,
        // Vous pouvez sérialiser payload.details en JSON si nécessaire
      },
    });
  }

  // Vérification que l'utilisateur est admin, renvoie une exception sinon
  private verifyAdmin(user: any): void {
    if (!user) {
      throw new UnauthorizedException('Vous devez être connecté.');
    }
    if (user.privilege?.libelle !== 'Admin') {
      throw new UnauthorizedException('Seuls les administrateurs peuvent accéder à cette ressource.');
    }
  }

  // Accès à tous les logs (logique dans le service)
  async findAll(user: any) {
    this.verifyAdmin(user);
    const logs = await this.prisma.log.findMany({
      where: { deletedAt: null },
      orderBy: { dateCreation: 'desc' },
    });
    return this.responseService.success(logs, 'Liste des logs récupérée');
  }

  // Accès à un log par son ID
  async findById(id: number, user: any) {
    this.verifyAdmin(user);
    const log = await this.prisma.log.findFirst({
      where: { id, deletedAt: null },
    });
    if (!log) {
      throw new NotFoundException('Log non trouvé');
    }
    return this.responseService.success(log, 'Log récupéré');
  }
}
