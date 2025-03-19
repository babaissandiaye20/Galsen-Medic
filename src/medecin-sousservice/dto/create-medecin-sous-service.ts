import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMedecinSousServiceDto {
  @IsInt()
  @IsNotEmpty()
  idMedecin: number;

  @IsInt()
  @IsNotEmpty()
  idSousService: number;
}
