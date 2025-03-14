
import {ApiProperty} from '@nestjs/swagger'
import {Utilisateur} from './utilisateur.entity'
import {SousService} from './sousService.entity'
import {Disponibilite} from './disponibilite.entity'
import {Reservation} from './reservation.entity'


export class MedecinSousService {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idMedecin: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idSousService: number ;
@ApiProperty({
  type: () => Utilisateur,
  required: false,
})
medecin?: Utilisateur ;
@ApiProperty({
  type: () => SousService,
  required: false,
})
sousService?: SousService ;
@ApiProperty({
  type: () => Disponibilite,
  isArray: true,
  required: false,
})
disponibilites?: Disponibilite[] ;
@ApiProperty({
  type: () => Reservation,
  isArray: true,
  required: false,
})
reservations?: Reservation[] ;
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
