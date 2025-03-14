
import {ApiProperty} from '@nestjs/swagger'
import {Reservation} from './reservation.entity'


export class StatutReservation {
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
