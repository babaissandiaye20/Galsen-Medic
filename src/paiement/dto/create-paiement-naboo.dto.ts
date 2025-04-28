// src/paiement/dto/create-paiement-naboo.dto.ts

import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaiementNabooDto {
  @ApiProperty({ description: 'ID de la réservation' })
  @IsInt()
  idReservation: number;

  @ApiProperty({ description: 'ID du mode de paiement' })
  @IsInt()
  idModePaiement: number;

  @ApiProperty({
    description: 'URL de redirection personnalisée après paiement (optionnelle)',
    required: false,
    example: 'http://localhost:4200/paiement-success?orderId=abc123',
  })
  @IsOptional()
  @IsString()
  @IsUrl({ require_tld: false })
  successUrl?: string;
}
