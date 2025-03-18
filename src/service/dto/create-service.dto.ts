import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ description: "Libellé du service", example: "Radiologie" })
  @IsNotEmpty()
  libelle: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsString()
  iconUrl?:string;


}
