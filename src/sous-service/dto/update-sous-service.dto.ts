import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSousServiceDto {
  @ApiProperty({ description: "Libellé du sous-service", example: "Échographie", required: false })
  @IsOptional()
  libelle?: string;

  @ApiProperty({ description: "URL de l'icône du sous-service", example: "https://exemple.com/icon.png", required: false })
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsString()
  iconUrl?: string;

}