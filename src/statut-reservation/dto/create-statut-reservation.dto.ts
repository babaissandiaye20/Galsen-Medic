import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatutReservationDto {
  @ApiProperty({ description: 'Libellé du statut', example: 'Confirmée' })
  @IsNotEmpty()
  @IsString()
  libelle: string;
}
