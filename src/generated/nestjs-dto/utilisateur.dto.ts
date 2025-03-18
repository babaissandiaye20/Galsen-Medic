
import {ApiProperty} from '@nestjs/swagger'


export class UtilisateurDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
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
  nullable: true,
})
profil: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
deletedAt: Date  | null;
}
