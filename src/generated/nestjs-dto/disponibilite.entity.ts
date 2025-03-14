
import {ApiProperty} from '@nestjs/swagger'
import {MedecinSousService} from './medecinSousService.entity'


export class Disponibilite {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idMedecinSousService: number ;
@ApiProperty({
  type: 'string',
})
jourSemaine: string ;
@ApiProperty({
  type: 'string',
})
heureDebut: string ;
@ApiProperty({
  type: 'string',
})
heureFin: string ;
@ApiProperty({
  type: () => MedecinSousService,
  required: false,
})
medecinSousService?: MedecinSousService ;
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
