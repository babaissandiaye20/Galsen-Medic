
import {ApiProperty} from '@nestjs/swagger'




export class UpdateReservationDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
typeConsultation?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
etatPaiement?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
