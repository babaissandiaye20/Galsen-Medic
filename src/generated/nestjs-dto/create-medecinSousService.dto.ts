
import {ApiProperty} from '@nestjs/swagger'




export class CreateMedecinSousServiceDto {
  @ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
  nullable: true,
})
deletedAt?: Date  | null;
}
