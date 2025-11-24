import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanoDto } from './create-plano.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TipoAtividade } from '../entities/atividade.entity';

class AtividadeUpdateDto {
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

export class UpdatePlanoDto extends PartialType(CreatePlanoDto) {}