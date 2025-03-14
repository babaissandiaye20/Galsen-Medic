
import {ApiProperty} from '@nestjs/swagger'




export class ConnectPaiementDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
})
id?: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
})
idReservation?: number ;
}
