
import {ApiProperty} from '@nestjs/swagger'




export class CreateReservationDto {
  @ApiProperty({
  type: 'string',
})
typeConsultation: string ;
@ApiProperty({
  type: 'string',
})
etatPaiement: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
