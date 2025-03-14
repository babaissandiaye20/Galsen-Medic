
import {ApiProperty} from '@nestjs/swagger'
import {Utilisateur} from './utilisateur.entity'


export class Log {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idUtilisateur: number ;
@ApiProperty({
  type: 'string',
})
action: string ;
@ApiProperty({
  type: 'string',
})
ip: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
dateCreation: Date ;
@ApiProperty({
  type: () => Utilisateur,
  required: false,
})
utilisateur?: Utilisateur ;
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
