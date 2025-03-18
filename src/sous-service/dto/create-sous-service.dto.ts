import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateSousServiceDto {
  @ApiProperty({ description: "Libellé du sous-service", example: "Échographie" })
  @IsNotEmpty()
  libelle: string;

  @ApiProperty({ description: "ID du service parent", example: 1 })
  @IsNotEmpty()
  @IsInt()
  idService: number;

  @ApiProperty({ description: "URL de l'icône du sous-service", example: "https://exemple.com/icon.png", required: false })
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsString()
  iconUrl?: string;


}
