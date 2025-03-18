import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @ApiProperty({ description: "Libellé du service", example: "Radiologie", required: false })
  @IsOptional()
  libelle?: string;

  @ApiProperty({ description: "URL de l'icône mise à jour", example: "https://exemple.com/icon.png", required: false })
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsString()
  iconUrl?: string;


}
