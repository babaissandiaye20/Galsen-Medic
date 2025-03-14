
import {ApiProperty} from '@nestjs/swagger'




export class UpdateModePaiementDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
libelle?: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
icon?: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
