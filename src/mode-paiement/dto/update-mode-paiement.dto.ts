import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateModePaiementDto {
  @ApiProperty({ description: "Libellé du mode de paiement", example: "MTN Mobile Money", required: false })
  @IsOptional()
  @IsString()
  libelle?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  icon?: string;
}
