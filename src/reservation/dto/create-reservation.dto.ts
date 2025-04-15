import { IsInt, IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ description: 'ID du médecin/sous-service' })
  @IsInt()
  idMedecinSousService: number;

  @ApiProperty({ description: 'ID du statut de la réservation' })
  @IsInt()
  idStatutReservation: number;

  @ApiProperty({ description: 'Type de consultation', enum: ['physique', 'video'] })
  @IsEnum(['physique', 'video'])
  typeConsultation: 'physique' | 'video';

  @ApiProperty({ description: 'Date de la réservation (ISO format)' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Heure de début (HH:mm)' })
  @IsString()
  heureDebut: string;

  @ApiProperty({ description: 'Heure de fin (HH:mm)' })
  @IsString()
  heureFin: string;
}
