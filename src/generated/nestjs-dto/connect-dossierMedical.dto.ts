
import {ApiProperty} from '@nestjs/swagger'




export class ConnectDossierMedicalDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
