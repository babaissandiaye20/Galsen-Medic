import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsEmail } from 'class-validator';

export class FindUtilisateurDto {
  @ApiProperty({ example: 'John', description: 'Filtrer par prénom', required: false })
  @IsOptional()
  @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
  prenom?: string;

  @ApiProperty({ example: 'Doe', description: 'Filtrer par nom', required: false })
  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  nom?: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Filtrer par email', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'L\'email n\'est pas valide' })
  email?: string;

  @ApiProperty({ example: 'admin', description: 'Filtrer par profil', required: false })
  @IsOptional()
  @IsString({ message: 'Le profil doit être une chaîne de caractères' })
  profil?: string;

  @ApiProperty({ example: 1, description: 'Filtrer par ID de privilège', required: false })
  @IsOptional()
  @IsInt({ message: 'L\'ID du privilège doit être un nombre entier' })
  idPrivilege?: number;
}
