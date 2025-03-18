
import {ApiProperty} from '@nestjs/swagger'




export class ConnectUtilisateurDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
})
id?: number ;
@ApiProperty({
  type: 'string',
  required: false,
})
email?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
telephone?: string ;
}
