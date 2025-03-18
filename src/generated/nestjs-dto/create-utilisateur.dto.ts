
import {ApiProperty} from '@nestjs/swagger'




export class CreateUtilisateurDto {
  @ApiProperty({
  type: 'string',
})
nom: string ;
@ApiProperty({
  type: 'string',
})
prenom: string ;
@ApiProperty({
  type: 'string',
})
email: string ;
@ApiProperty({
  type: 'string',
})
password: string ;
@ApiProperty({
  type: 'string',
})
telephone: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
profil?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
