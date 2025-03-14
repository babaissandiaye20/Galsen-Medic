
import {ApiProperty} from '@nestjs/swagger'




export class ConnectSousServiceDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
