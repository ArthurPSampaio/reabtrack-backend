import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { RegistrosService } from 'src/registros/registros.service';
import { Registro } from 'src/registros/entities/registro.entity';
import { OnEvent } from '@nestjs/event-emitter';

const AI_API_URL = process.env.AI_API_URL || 'http://localhost:8000';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly registrosService: RegistrosService,
  ) {}

  private formatarRegistroParaIA(r: Registro): string {
    const partes: string[] = [];
    if (r.dataSessao) partes.push(`Data: ${r.dataSessao.toISOString()}`);
    if (r.escalaDor) partes.push(`Dor: ${r.escalaDor}/10`);
    if (r.percepcaoEsforco) partes.push(`Esforço: ${r.percepcaoEsforco}/10`);
    if (r.notasSubjetivas) partes.push(`Subjetivo: ${r.notasSubjetivas}`);
    if (r.notasObjetivas) partes.push(`Objetivo: ${r.notasObjetivas}`);
    if (r.avaliacao) partes.push(`Avaliação: ${r.avaliacao}`);
    if (r.planoProximaSessao) partes.push(`Plano: ${r.planoProximaSessao}`);
    return partes.join('; ');
  }

  @OnEvent('registro.created')
  async handleRegistroCreatedEvent(registro: Registro) {
    this.logger.log(`Recebido evento 'registro.created' para ${registro.id}`);
    
    const pacienteId = registro.paciente.id;
    const doc = {
      id: registro.id,
      text: this.formatarRegistroParaIA(registro),
      meta: { data: registro.dataSessao },
    };

    const payload = {
      pacienteId: pacienteId,
      docs: [doc],
    };

    try {
      this.logger.log(`Ingerindo doc ${registro.id} para paciente ${pacienteId}...`);
      await firstValueFrom(
        this.httpService.post(`${AI_API_URL}/ingest`, payload, {
          headers: { 'x-api-key': this.configService.get('AI_API_KEY') },
        }),
      );
      this.logger.log(`Ingestão (via evento) de ${registro.id} concluída.`);
    } catch (e) {
      this.logger.error(`Falha na ingestão (via evento): ${e.message}`);
    }
  }

  async summarizeByPaciente(pacienteId: string, instrucoes: string) {
    const registros = await this.registrosService.findByPaciente(pacienteId);
    
    const totalSessoes = registros.length;
    const mediaDor =
      registros
        .map((r) => r.escalaDor)
        .filter((d) => d != null)
        .reduce((a, b) => a + b, 0) / (totalSessoes || 1);

    const payload = {
      pacienteId: pacienteId,
      query: instrucoes || 'Resumo clínico do paciente',
      indicadores: {
        totalSessoes,
        mediaDor: parseFloat(mediaDor.toFixed(1)),
      },
    };

    try {
      this.logger.log(`Gerando resumo para paciente ${pacienteId}...`);
      const { data } = await firstValueFrom(
        this.httpService.post(
          `${AI_API_URL}/summarize/by-paciente`,
          payload,
          { headers: { 'x-api-key': this.configService.get('AI_API_KEY') } },
        ),
      );
      return data; 
    } catch (e) {
      this.logger.error(`Falha ao gerar resumo ${pacienteId}: ${e.message}`);
      throw new Error('Falha ao conectar com o serviço de IA');
    }
  }
}