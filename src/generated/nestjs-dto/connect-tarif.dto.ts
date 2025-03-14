
import {ApiProperty} from '@nestjs/swagger'




export class ConnectTarifDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
