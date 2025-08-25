import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Max,
    Min,
  } from 'class-validator';
  
  export class CreateRegistroDto {
    @IsInt()
    @Min(0)
    @Max(10)
    @IsOptional()
    escalaDor?: number;
  
    @IsInt()
    @Min(0)
    @Max(10)
    @IsOptional()
    percepcaoEsforco?: number;
  
    @IsBoolean()
    @IsOptional()
    conseguiuRealizarTudo?: boolean;
  
    @IsString()
    @IsOptional()
    notasSubjetivas?: string;
  
    @IsString()
    @IsOptional()
    notasObjetivas?: string;
  
    @IsString()
    @IsOptional()
    avaliacao?: string;
  
    @IsString()
    @IsOptional()
    planoProximaSessao?: string;
  
    @IsUUID()
    @IsNotEmpty()
    pacienteId: string;
  
    @IsUUID()
    @IsOptional()
    planoId?: string;
  }