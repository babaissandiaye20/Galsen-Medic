
import {ApiProperty} from '@nestjs/swagger'




export class UpdateDisponibiliteDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
jourSemaine?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
heureDebut?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
heureFin?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
