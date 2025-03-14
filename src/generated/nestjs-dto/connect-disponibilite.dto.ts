
import {ApiProperty} from '@nestjs/swagger'




export class ConnectDisponibiliteDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
