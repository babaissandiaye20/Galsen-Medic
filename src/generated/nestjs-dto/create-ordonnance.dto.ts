
import {ApiProperty} from '@nestjs/swagger'




export class CreateOrdonnanceDto {
  @ApiProperty({
  type: 'string',
})
contenu: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
