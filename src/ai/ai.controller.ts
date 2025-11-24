import { Controller, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { AiService } from './ai.service';

class SummarizeDto {
  pacienteId: string;
  instrucoes: string;
}

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('/summarize/by-paciente')
  summarize(@Body() body: SummarizeDto) {
    return this.aiService.summarizeByPaciente(
      body.pacienteId,
      body.instrucoes,
    );
  }
}