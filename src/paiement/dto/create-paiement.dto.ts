import { IsNumber, IsPositive, IsOptional, IsString } from 'class-validator';

export class CreatePaiementDto {
  @IsNumber()
  idReservation: number;

  @IsNumber()
  @IsPositive()
  montant: number;

  @IsNumber()
  idModePaiement: number;

  @IsOptional()
  @IsString()
  etatTransaction?: string;
}
