
import {ApiProperty} from '@nestjs/swagger'
import {SousService} from './sousService.entity'
import {Devise} from './devise.entity'


export class Tarif {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idSousService: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
idDevise: number ;
@ApiProperty({
  type: 'number',
  format: 'float',
})
montant: number ;
@ApiProperty({
  type: 'boolean',
})
actif: boolean ;
@ApiProperty({
  type: () => SousService,
  required: false,
})
sousService?: SousService ;
@ApiProperty({
  type: () => Devise,
  required: false,
})
devise?: Devise ;
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
