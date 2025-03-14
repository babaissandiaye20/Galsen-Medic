
import {ApiProperty} from '@nestjs/swagger'




export class UpdateServiceDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
libelle?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
