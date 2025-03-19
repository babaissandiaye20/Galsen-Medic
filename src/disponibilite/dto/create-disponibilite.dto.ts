import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt, Matches } from 'class-validator';

export class CreateDisponibiliteDto {
  @ApiProperty({ example: 1, description: 'ID du médecin ou secrétaire' })
  @IsNotEmpty()
  @IsInt()
  idMedecinSousService: number;

  @ApiProperty({ example: 'lundi', description: 'Jour de disponibilité' })
  @IsNotEmpty()
  @IsString()
  jourSemaine: string;

  @ApiProperty({ example: '09:00', description: 'Heure de début' })
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Format invalide (HH:mm)' })
  heureDebut: string;

  @ApiProperty({ example: '16:00', description: 'Heure de fin' })
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Format invalide (HH:mm)' })
  heureFin: string;

  @ApiProperty({ example: '12:00', description: 'Début de la pause', required: false })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Format invalide (HH:mm)' })
  pauseDebut?: string;

  @ApiProperty({ example: '12:30', description: 'Fin de la pause', required: false })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Format invalide (HH:mm)' })
  pauseFin?: string;
}
