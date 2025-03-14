
import {ApiProperty} from '@nestjs/swagger'




export class CreatePaiementDto {
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
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
