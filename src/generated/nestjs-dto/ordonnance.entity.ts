
import {ApiProperty} from '@nestjs/swagger'
import {Utilisateur} from './utilisateur.entity'


export class Ordonnance {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idPatient: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idMedecin: number ;
@ApiProperty({
  type: 'string',
})
contenu: string ;
@ApiProperty({
  type: () => Utilisateur,
  required: false,
})
patient?: Utilisateur ;
@ApiProperty({
  type: () => Utilisateur,
  required: false,
})
medecin?: Utilisateur ;
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
