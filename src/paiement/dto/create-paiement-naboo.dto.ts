import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaiementNabooDto {
  @ApiProperty({ description: 'ID de la réservation' })
  @IsInt()
  idReservation: number;

  @ApiProperty({ description: 'ID du mode de paiement' })
  @IsInt()
  idModePaiement: number;
}
