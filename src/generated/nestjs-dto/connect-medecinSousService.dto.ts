
import {ApiProperty} from '@nestjs/swagger'




export class ConnectMedecinSousServiceDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
