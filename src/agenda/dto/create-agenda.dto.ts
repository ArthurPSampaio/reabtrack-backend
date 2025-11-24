import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, Length, ValidateIf } from 'class-validator';

export class CreateAgendaDto {
  @IsDateString() @IsNotEmpty()
  inicio: string;

  @IsDateString() @IsNotEmpty()
  fim: string;

  @IsUUID() @IsNotEmpty()
  pacienteId: string;

  @IsUUID() @IsNotEmpty()
  planoId: string;

  @IsString() @IsOptional() @Length(1, 120)
  local?: string;

  @IsString() @IsOptional()
  observacoes?: string;
}
