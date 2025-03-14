
import {ApiProperty} from '@nestjs/swagger'




export class ConnectReservationDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
