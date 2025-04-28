import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateServiceDto {
  @ApiProperty({ description: "Libellé du service", example: "Radiologie", required: false })
  @IsOptional()
  @IsString()
  libelle?: string;

  @ApiProperty({
    description: "URL de l’icône, si déjà hébergée",
    example: "https://exemple.com/icon.png",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  iconUrl?: string; // ✅ ici : on attend une URL texte
}
