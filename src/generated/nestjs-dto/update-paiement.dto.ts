
import {ApiProperty} from '@nestjs/swagger'




export class UpdatePaiementDto {
  @ApiProperty({
  type: 'number',
  format: 'float',
  required: false,
})
montant?: number ;
@ApiProperty({
  type: 'string',
  required: false,
})
referenceTransaction?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
etatTransaction?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
