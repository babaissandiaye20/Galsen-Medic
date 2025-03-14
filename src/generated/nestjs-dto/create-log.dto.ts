
import {ApiProperty} from '@nestjs/swagger'




export class CreateLogDto {
  @ApiProperty({
  type: 'string',
})
action: string ;
@ApiProperty({
  type: 'string',
})
ip: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
