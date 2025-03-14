
import {ApiProperty} from '@nestjs/swagger'




export class UpdateDeviseDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
code?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
libelle?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
symbole?: string ;
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
