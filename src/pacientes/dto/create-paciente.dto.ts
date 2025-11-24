import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GeneroPaciente } from '../entities/paciente.entity';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsDateString()
  @IsNotEmpty()
  dataNascimento: string;

  @IsEnum(GeneroPaciente)
  @IsNotEmpty()
  genero: GeneroPaciente;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @IsString()
  @IsNotEmpty()
  sintomas: string;
}