import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisponibiliteDto } from './dto/create-disponibilite.dto';
import { UpdateDisponibiliteDto } from './dto/update-disponibilite.dto';
import { ResponseService } from '../validation/exception/response/response.service';

@Injectable()
export class DisponibiliteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  /**
   * ✅ Créer une disponibilité (Seulement Medecin/Admin)
   */
  async create(createDisponibiliteDto: CreateDisponibiliteDto, currentUser: any) {
    if (!currentUser) {
      throw new ForbiddenException(this.responseService.forbidden("Vous devez être connecté."));
    }

    // Vérification des rôles autorisés
    const user = await this.prisma.utilisateur.findUnique({
      where: { id: currentUser.id },
      include: { privilege: true },
    });

    if (!user || !['Medecin', 'Admin'].includes(user.privilege.libelle)) {
      throw new ForbiddenException(this.responseService.forbidden("Seuls les médecins et administrateurs peuvent créer une disponibilité."));
    }

    // Validation des jours de la semaine
    const joursValid = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    const jourSemaineNormalized = createDisponibiliteDto.jourSemaine.trim().toLowerCase();

    if (!joursValid.includes(jourSemaineNormalized)) {
      throw new BadRequestException(`Jour invalide. Choisissez parmi : ${joursValid.join(", ")}.`);
    }

    // Vérifier si une disponibilité existe déjà pour ce médecin et ce jour
    const existingDisponibilite = await this.prisma.disponibilite.findFirst({
      where: {
        idMedecinSousService: createDisponibiliteDto.idMedecinSousService,
        jourSemaine: jourSemaineNormalized,
        active: true,
      },
    });

    if (existingDisponibilite) {
      throw new BadRequestException(
        "Une disponibilité pour ce jour existe déjà. Modifiez-la au lieu d'en créer une nouvelle."
      );
    }

    // Création de la disponibilité
    const disponibilite = await this.prisma.disponibilite.create({
      data: {
        idMedecinSousService: createDisponibiliteDto.idMedecinSousService,
        jourSemaine: jourSemaineNormalized,
        heureDebut: createDisponibiliteDto.heureDebut,
        heureFin: createDisponibiliteDto.heureFin,
        pauseDebut: createDisponibiliteDto.pauseDebut,
        pauseFin: createDisponibiliteDto.pauseFin,
        active: true,
        semaine: this.getNumeroSemaine(),
      },
    });

    return this.responseService.created(disponibilite, 'Disponibilité créée avec succès');
  }

  /**
   * ✅ Récupérer toutes les disponibilités actives
   */
  async findAll() {
    const disponibilites = await this.prisma.disponibilite.findMany({
      where: { active: true },
      orderBy: { jourSemaine: 'asc' },
    });

    return this.responseService.success(disponibilites, 'Toutes les disponibilités récupérées');
  }

  /**
   * ✅ Récupérer une disponibilité par ID (Avec créneaux disponibles)
   */
  async findDisponibilitesById(id: number) {
    const disponibilite = await this.prisma.disponibilite.findUnique({ where: { id } });

    if (!disponibilite) {
      throw new NotFoundException(this.responseService.notFound(`Disponibilité #${id} non trouvée.`));
    }

    const reservations = await this.prisma.reservation.findMany({
      where: { idMedecinSousService: disponibilite.idMedecinSousService },
      select: { heureDebut: true, heureFin: true },
    });

    const reservationsSet = new Set(reservations.map(r => `${r.heureDebut}-${r.heureFin}`));
    const horairesDisponibles = this.genererCreneauxDisponibles(disponibilite, reservationsSet);

    return this.responseService.success(
      { ...disponibilite, horairesDisponibles },
      'Disponibilité récupérée avec créneaux disponibles'
    );
  }

  /**
   * ✅ Générer les créneaux disponibles
   */
  private genererCreneauxDisponibles(disponibilite, reservationsSet: Set<string>) {
    const horairesDisponibles: string[] = [];
    let currentHeure = this.parseTime(disponibilite.heureDebut);
    const fin = this.parseTime(disponibilite.heureFin);

    while (currentHeure < fin) {
      const nextHeure = new Date(currentHeure.getTime() + 30 * 60000);
      const creneau = `${this.formatHeure(currentHeure)} - ${this.formatHeure(nextHeure)}`;

      if (!reservationsSet.has(creneau)) {
        horairesDisponibles.push(creneau);
      }

      currentHeure = nextHeure;
    }

    return horairesDisponibles;
  }

  /**
   * ✅ Calcul du numéro de la semaine actuelle
   */
  private getNumeroSemaine(): number {
    const date = new Date();
    const debutAnnee = new Date(date.getFullYear(), 0, 1);
    const joursEcoules = Math.floor((date.getTime() - debutAnnee.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((joursEcoules + debutAnnee.getDay() + 1) / 7);
  }

  /**
   * ✅ Convertir une heure en Date
   */
  private parseTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  /**
   * ✅ Formatter une heure en chaîne lisible
   */
  private formatHeure(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  /**
   * ✅ Récupérer toutes les disponibilités d'un médecin spécifique
   */
  async findDisponibilitesByMedecin(idMedecin: number) {
    // Vérifier si le médecin existe
    const medecin = await this.prisma.utilisateur.findUnique({
      where: { id: idMedecin },
      include: { MedecinSousService: true },
    });

    if (!medecin) {
      throw new NotFoundException(
        this.responseService.notFound(`Médecin #${idMedecin} non trouvé.`)
      );
    }

    // Récupérer les disponibilités du médecin
    const disponibilites = await this.prisma.disponibilite.findMany({
      where: {
        idMedecinSousService: {
          in: medecin.MedecinSousService.map((mss) => mss.id),
        },
        active: true,
      },
      orderBy: { jourSemaine: 'asc' },
    });

    return this.responseService.success(
      disponibilites,
      `Disponibilités du médecin #${idMedecin} récupérées`
    );
  }

}
