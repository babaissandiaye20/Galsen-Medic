
import {ApiProperty} from '@nestjs/swagger'




export class UpdateDossierMedicalDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
historique?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
fichiers?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
})
dateMiseAJour?: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
