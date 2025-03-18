import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class CreateUtilisateurDto {
  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  nom: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  prenom: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @Matches(/^\d{9,15}$/, {
    message: "Le numéro de téléphone doit contenir entre 9 et 15 chiffres",
  }) // ✅ Vérification du format
  telephone: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  idPrivilege: number;
}
