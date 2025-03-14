
import {ApiProperty} from '@nestjs/swagger'




export class CreateDisponibiliteDto {
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
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
