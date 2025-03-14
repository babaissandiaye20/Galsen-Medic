
import {ApiProperty} from '@nestjs/swagger'
import {Service} from './service.entity'
import {MedecinSousService} from './medecinSousService.entity'
import {Tarif} from './tarif.entity'


export class SousService {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
libelle: string ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idService: number ;
@ApiProperty({
  type: () => Service,
  required: false,
})
service?: Service ;
@ApiProperty({
  type: () => MedecinSousService,
  isArray: true,
  required: false,
})
medecins?: MedecinSousService[] ;
@ApiProperty({
  type: () => Tarif,
  isArray: true,
  required: false,
})
tarifs?: Tarif[] ;
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
