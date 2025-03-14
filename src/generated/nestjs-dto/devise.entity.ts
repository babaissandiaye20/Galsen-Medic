
import {ApiProperty} from '@nestjs/swagger'
import {Tarif} from './tarif.entity'


export class Devise {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
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
  type: () => Tarif,
  isArray: true,
  required: false,
})
tarifs?: Tarif[] ;
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
