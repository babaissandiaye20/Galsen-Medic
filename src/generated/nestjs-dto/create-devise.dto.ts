
import {ApiProperty} from '@nestjs/swagger'




export class CreateDeviseDto {
  @ApiProperty({
  type: 'string',
})
code: string ;
@ApiProperty({
  type: 'string',
})
libelle: string ;
@ApiProperty({
  type: 'string',
})
symbole: string ;
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
