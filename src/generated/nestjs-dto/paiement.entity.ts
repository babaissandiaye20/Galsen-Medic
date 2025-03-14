
import {ApiProperty} from '@nestjs/swagger'
import {Reservation} from './reservation.entity'
import {ModePaiement} from './modePaiement.entity'


export class Paiement {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idReservation: number ;
@ApiProperty({
  type: 'number',
  format: 'float',
})
montant: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idModePaiement: number ;
@ApiProperty({
  type: 'string',
})
referenceTransaction: string ;
@ApiProperty({
  type: 'string',
})
etatTransaction: string ;
@ApiProperty({
  type: () => Reservation,
  required: false,
})
reservation?: Reservation ;
@ApiProperty({
  type: () => ModePaiement,
  required: false,
})
modePaiement?: ModePaiement ;
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
