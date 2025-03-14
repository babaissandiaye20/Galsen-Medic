
import {ApiProperty} from '@nestjs/swagger'


export class LogDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
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
})
dateCreation: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
deletedAt: Date  | null;
}
