
import {ApiProperty} from '@nestjs/swagger'




export class ConnectLogDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
