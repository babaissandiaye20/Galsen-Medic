
import {ApiProperty} from '@nestjs/swagger'




export class CreateTarifDto {
  @ApiProperty({
  type: 'number',
  format: 'float',
})
montant: number ;
@ApiProperty({
  type: 'boolean',
})
actif: boolean ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
