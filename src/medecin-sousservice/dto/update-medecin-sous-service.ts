import { IsInt, IsOptional } from 'class-validator';

export class UpdateMedecinSousServiceDto {
  @IsInt()
  @IsOptional()
  idMedecin?: number;

  @IsInt()
  @IsOptional()
  idSousService?: number;
}
