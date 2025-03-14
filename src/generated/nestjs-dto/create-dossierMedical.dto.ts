
import {ApiProperty} from '@nestjs/swagger'




export class CreateDossierMedicalDto {
  @ApiProperty({
  type: 'string',
})
historique: string ;
@ApiProperty({
  type: 'string',
})
fichiers: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
dateMiseAJour: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
