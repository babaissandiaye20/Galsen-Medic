import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilisateurDto } from './create-utilisateur.dto';
import { IsOptional, IsString, IsEmail, MinLength, Matches, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {
  @ApiProperty({ example: 'newemail@example.com', description: 'Nouvel email (optionnel)' })
  @IsOptional()
  @IsEmail({}, { message: 'L\'email n\'est pas valide' })
  email?: string;

  @ApiProperty({ example: 'NewPassword123!', description: 'Nouveau mot de passe (optionnel)' })
  @IsOptional()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
  })
  password?: string;

  @ApiProperty({ example: '+33612345678', description: 'Nouveau numéro de téléphone (optionnel)' })
  @IsOptional()
  @Matches(/^(\+?\d{10,15})$/, { message: 'Le numéro de téléphone n\'est pas valide' })
  telephone?: string;

  @ApiProperty({ example: 'admin', description: 'Nouveau profil utilisateur (optionnel)' })
  @IsOptional()
  @IsString({ message: 'Le profil doit être une chaîne de caractères' })
  profil?: string;

  @ApiProperty({ example: 2, description: 'Nouvel ID de privilège (optionnel)' })
  @IsOptional()
  @IsInt({ message: 'L\'ID du privilège doit être un nombre entier' })
  idPrivilege?: number;
}
