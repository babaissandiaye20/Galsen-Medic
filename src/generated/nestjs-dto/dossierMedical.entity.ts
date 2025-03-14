
import {ApiProperty} from '@nestjs/swagger'
import {Utilisateur} from './utilisateur.entity'


export class DossierMedical {
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
  type: 'string',
})
historique: string ;
@ApiProperty({
  type: 'string',
})
fichiers: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
dateMiseAJour: Date ;
@ApiProperty({
  type: () => Utilisateur,
  required: false,
})
patient?: Utilisateur ;
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
