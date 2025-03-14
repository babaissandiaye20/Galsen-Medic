
import {ApiProperty} from '@nestjs/swagger'


export class PaiementDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'number',
  format: 'float',
})
montant: number ;
@ApiProperty({
  type: 'string',
})
referenceTransaction: string ;
@ApiProperty({
  type: 'string',
})
etatTransaction: string ;
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
