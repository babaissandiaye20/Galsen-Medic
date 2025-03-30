import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStatutReservationDto {
  @ApiProperty({ description: 'Libellé du statut', example: 'Confirmée' })
  @IsOptional()
  @IsString()
  libelle?: string;
}
