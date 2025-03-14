
import {ApiProperty} from '@nestjs/swagger'


export class DisponibiliteDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
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
