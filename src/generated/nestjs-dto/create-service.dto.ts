
import {ApiProperty} from '@nestjs/swagger'




export class CreateServiceDto {
  @ApiProperty({
  type: 'string',
})
libelle: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
