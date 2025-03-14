
import {ApiProperty} from '@nestjs/swagger'




export class UpdateLogDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
action?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
ip?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
