// create-tarif.dto.ts
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateTarifDto {
  @IsNumber()
  @IsNotEmpty()
  idSousService: number;

  @IsNumber()
  @IsNotEmpty()
  idDevise: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  montant: number;

  @IsBoolean()
  @IsOptional()
  actif: boolean = true; // Actif par défaut
}
