import { IsOptional, IsInt, IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservationDto {
  @ApiProperty({ description: 'ID du médecin/sous-service', required: false })
  @IsOptional()
  @IsInt()
  idMedecinSousService?: number;

  @ApiProperty({ description: 'Type de consultation', enum: ['physique', 'video'], required: false })
  @IsOptional()
  @IsEnum(['physique', 'video'])
  typeConsultation?: 'physique' | 'video';

  @ApiProperty({ description: 'Date de la réservation', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ description: 'Heure de début (HH:mm)', required: false })
  @IsOptional()
  @IsString()
  heureDebut?: string;

  @ApiProperty({ description: 'Heure de fin (HH:mm)', required: false })
  @IsOptional()
  @IsString()
  heureFin?: string;
}
