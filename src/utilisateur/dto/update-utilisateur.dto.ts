import {
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsInt,
  ValidateIf,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUtilisateurDto {
  @ApiPropertyOptional({ example: 'John' })
  @ValidateIf(o => o.prenom !== '')
  @IsOptional()
  @IsString()
  prenom?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @ValidateIf(o => o.nom !== '')
  @IsOptional()
  @IsString()
  nom?: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  @ValidateIf(o => o.email !== '')
  @IsOptional()
  @IsEmail({}, { message: "L'email n'est pas valide" })
  email?: string;

  @ApiPropertyOptional({ example: 'NewPassword123!' })
  @ValidateIf(o => o.password !== '')
  @IsOptional()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
    message: 'Mot de passe trop faible',
  })
  password?: string;

  @ApiPropertyOptional({ example: '+221786360662' })
  @ValidateIf(o => o.telephone !== '')
  @IsOptional()
  @Matches(/^\+?\d{9,15}$/, {
    message: "Le numéro de téléphone doit commencer par + et contenir entre 9 et 15 chiffres",
  })
  telephone?: string;

  @ApiPropertyOptional({ example: 'Admin' })
  @ValidateIf(o => o.profil !== '')
  @IsOptional()
  @IsString()
  profil?: string;

  @ApiPropertyOptional({ example: 2 })
  @ValidateIf(o => o.idPrivilege !== '')
  @IsOptional()
  @IsInt()
  idPrivilege?: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' }) // ✅ pour Swagger
  @IsOptional() // ✅ pour éviter une erreur si non envoyé
  profilUrl?: any; // ✅ surtout pas @IsString()
}
