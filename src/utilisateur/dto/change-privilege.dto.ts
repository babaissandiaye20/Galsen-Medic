import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChangePrivilegeDto {
  @ApiProperty({ example: 2, description: 'Nouvel ID du privilège' })
  @IsNotEmpty()
  @IsNumber()
  idPrivilege: number;
}
