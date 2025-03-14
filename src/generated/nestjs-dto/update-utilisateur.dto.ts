
import {ApiProperty} from '@nestjs/swagger'




export class UpdateUtilisateurDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
nom?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
prenom?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
email?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
password?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
telephone?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
profil?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
