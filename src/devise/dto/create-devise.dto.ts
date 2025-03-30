import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateDeviseDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 5) // Ex: "USD", "EUR"
  code: string;

  @IsString()
  @IsNotEmpty()
  libelle: string;

  @IsString()
  @IsNotEmpty()
  symbole: string;

  @IsBoolean()
  @IsOptional()
  actif: boolean = true; // Valeur par défaut pour éviter undefined
}
