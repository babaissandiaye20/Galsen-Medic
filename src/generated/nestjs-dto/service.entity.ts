
import {ApiProperty} from '@nestjs/swagger'
import {SousService} from './sousService.entity'


export class Service {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
libelle: string ;
@ApiProperty({
  type: () => SousService,
  isArray: true,
  required: false,
})
sousServices?: SousService[] ;
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
