
import {ApiProperty} from '@nestjs/swagger'




export class UpdateOrdonnanceDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
contenu?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
