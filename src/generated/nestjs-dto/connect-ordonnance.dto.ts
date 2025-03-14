
import {ApiProperty} from '@nestjs/swagger'




export class ConnectOrdonnanceDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
