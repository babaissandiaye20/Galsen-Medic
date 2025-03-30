import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateModePaiementDto {
  @ApiProperty({ description: "Libellé du mode de paiement", example: "Orange Money" })
  @IsNotEmpty()
  @IsString()
  libelle: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  icon?: string;
}
