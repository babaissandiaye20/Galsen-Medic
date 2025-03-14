import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePrivilegeDto {
  @ApiProperty({ description: 'Libellé du privilège', example: 'ADMIN' })
  @IsNotEmpty({ message: 'Le libellé ne peut pas être vide' })
  @IsString({ message: 'Le libellé doit être une chaîne de caractères' })
  libelle: string;
}
