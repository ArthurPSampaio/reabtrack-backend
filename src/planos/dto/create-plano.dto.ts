import {
    IsArray,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { StatusPlano } from '../entities/plano.entity';
  import { TipoAtividade } from '../entities/atividade.entity';
  
  class CreateAtividadeDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    nome: string;
  
    @IsString()
    @IsOptional()
    descricao?: string;
  
    @IsEnum(TipoAtividade)
    @IsOptional()
    tipo?: TipoAtividade;
  
    @IsNumber()
    @IsOptional()
    series?: number;
  
    @IsNumber()
    @IsOptional()
    repeticoes?: number;
  
    @IsString()
    @IsOptional()
    frequencia?: string;
    
    @IsString()
    @IsOptional()
    observacoes?: string;
  }
  
  export class CreatePlanoDto {
    @IsString()
    @IsNotEmpty()
    objetivoGeral: string;
  
    @IsString()
    @IsNotEmpty()
    diagnosticoRelacionado: string;
  
    @IsDateString()
    @IsOptional()
    dataFimPrevista?: Date;
  
    @IsEnum(StatusPlano)
    @IsOptional()
    status?: StatusPlano;
  
    @IsUUID()
    @IsNotEmpty()
    pacienteId: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAtividadeDto)
    @IsOptional()
    atividades?: CreateAtividadeDto[];
  }