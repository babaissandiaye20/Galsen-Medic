
import {ApiProperty} from '@nestjs/swagger'
import {Privilege} from './privilege.entity'
import {Reservation} from './reservation.entity'
import {DossierMedical} from './dossierMedical.entity'
import {Log} from './log.entity'
import {Ordonnance} from './ordonnance.entity'
import {MedecinSousService} from './medecinSousService.entity'


export class Utilisateur {
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
  type: 'integer',
  format: 'int32',
})
idPrivilege: number ;
@ApiProperty({
  type: () => Privilege,
  required: false,
})
privilege?: Privilege ;
@ApiProperty({
  type: () => Reservation,
  isArray: true,
  required: false,
})
reservations?: Reservation[] ;
@ApiProperty({
  type: () => DossierMedical,
  isArray: true,
  required: false,
})
dossiers?: DossierMedical[] ;
@ApiProperty({
  type: () => Log,
  isArray: true,
  required: false,
})
logs?: Log[] ;
@ApiProperty({
  type: () => Ordonnance,
  isArray: true,
  required: false,
})
ordonnancesMedecin?: Ordonnance[] ;
@ApiProperty({
  type: () => Ordonnance,
  isArray: true,
  required: false,
})
ordonnancesPatient?: Ordonnance[] ;
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
@ApiProperty({
  type: () => MedecinSousService,
  isArray: true,
  required: false,
})
MedecinSousService?: MedecinSousService[] ;
}
