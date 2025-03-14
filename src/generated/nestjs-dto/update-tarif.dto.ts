
import {ApiProperty} from '@nestjs/swagger'




export class UpdateTarifDto {
  @ApiProperty({
  type: 'number',
  format: 'float',
  required: false,
})
montant?: number ;
@ApiProperty({
  type: 'boolean',
  required: false,
})
actif?: boolean ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
