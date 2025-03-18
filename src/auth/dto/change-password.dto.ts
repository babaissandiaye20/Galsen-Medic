import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'ancienMotDePasse123' })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: 'nouveauMotDePasse456' })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
