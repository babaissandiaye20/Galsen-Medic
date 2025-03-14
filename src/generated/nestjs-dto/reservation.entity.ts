
import {ApiProperty} from '@nestjs/swagger'
import {Utilisateur} from './utilisateur.entity'
import {MedecinSousService} from './medecinSousService.entity'
import {StatutReservation} from './statutReservation.entity'
import {Paiement} from './paiement.entity'


export class Reservation {
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
  type: 'integer',
  format: 'int32',
})
idMedecinSousService: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idStatutReservation: number ;
@ApiProperty({
  type: 'string',
})
typeConsultation: string ;
@ApiProperty({
  type: 'string',
})
etatPaiement: string ;
@ApiProperty({
  type: () => Utilisateur,
  required: false,
})
utilisateur?: Utilisateur ;
@ApiProperty({
  type: () => MedecinSousService,
  required: false,
})
medecinSousService?: MedecinSousService ;
@ApiProperty({
  type: () => StatutReservation,
  required: false,
})
statutReservation?: StatutReservation ;
@ApiProperty({
  type: () => Paiement,
  required: false,
  nullable: true,
})
paiement?: Paiement  | null;
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
