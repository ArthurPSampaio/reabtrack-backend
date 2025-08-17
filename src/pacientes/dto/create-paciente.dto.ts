import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePacienteDto {
  @IsString() 
  @IsNotEmpty() 
  nome: string;

  @IsInt() 
  @Min(0) 
  @IsNotEmpty()
  idade: number;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @IsString()
  @IsNotEmpty()
  sintomas: string;
}