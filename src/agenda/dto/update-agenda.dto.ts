import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaDto } from './create-agenda.dto';
import { IsIn, IsOptional } from 'class-validator';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {
  @IsOptional()
  @IsIn(['scheduled', 'completed', 'canceled', 'no_show'])
  status?: 'scheduled' | 'completed' | 'canceled' | 'no_show';
}
