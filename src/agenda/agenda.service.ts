import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Sessao } from './entities/sessao.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { PlanosService } from 'src/planos/planos.service';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Sessao) private readonly repo: Repository<Sessao>,
    private readonly pacientesService: PacientesService,
    private readonly planosService: PlanosService,
  ) {}

  private validarPeriodo(inicio: Date, fim: Date) {
    if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
      throw new BadRequestException('Datas inválidas');
    }
    if (fim <= inicio) {
      throw new BadRequestException('Fim deve ser depois do início');
    }
  }

  private async validarPlanoDoPaciente(planoId: string, pacienteId: string) {
    const plano = await this.planosService.findOne(planoId);
    if (plano.paciente.id !== pacienteId) {
      throw new BadRequestException('Plano não pertence a este paciente');
    }
    return plano;
  }

  private async verificarConflitoHorario(
    pacienteId: string,
    inicio: Date,
    fim: Date,
    ignorarId?: string,
  ) {
    const qb = this.repo
      .createQueryBuilder('s')
      .where('s."pacienteId" = :pacienteId', { pacienteId })
      .andWhere('s.status != :canceled', { canceled: 'canceled' })
      .andWhere('s.inicio < :fim', { fim })
      .andWhere('s.fim > :inicio', { inicio });

    if (ignorarId) qb.andWhere('s.id != :ignorarId', { ignorarId });

    const existeConflito = await qb.getExists();
    if (existeConflito) {
      throw new BadRequestException('Conflito de horário para este paciente');
    }
  }

  async create(dto: CreateAgendaDto): Promise<Sessao> {
    const inicio = new Date(dto.inicio);
    const fim = new Date(dto.fim);

    this.validarPeriodo(inicio, fim);

    const paciente = await this.pacientesService.findOne(dto.pacienteId);
    const plano = await this.validarPlanoDoPaciente(
      dto.planoId,
      dto.pacienteId,
    );

    await this.verificarConflitoHorario(paciente.id, inicio, fim);

    const sessao = this.repo.create({
      inicio,
      fim,
      status: 'scheduled',
      local: dto.local,
      observacoes: dto.observacoes,
      paciente,
      plano,
    });

    return this.repo.save(sessao);
  }

  findAll(query?: {
    from?: string;
    to?: string;
    pacienteId?: string;
    status?: string;
  }) {
    const where: any = {};
    if (query?.pacienteId) where.paciente = { id: query.pacienteId };
    if (query?.status) where.status = query.status;

    if (query?.from || query?.to) {
      const from = query.from
        ? new Date(query.from)
        : new Date('1970-01-01T00:00:00.000Z');
      const to = query.to
        ? new Date(query.to)
        : new Date('2999-12-31T23:59:59.999Z');
      where.inicio = Between(from, to);
    }

    return this.repo.find({ where, order: { inicio: 'ASC' } });
  }

  async findOne(id: string): Promise<Sessao> {
    const sessao = await this.repo.findOne({ where: { id } });
    if (!sessao) throw new NotFoundException('Sessão não encontrada');
    return sessao;
  }

  async update(id: string, dto: UpdateAgendaDto): Promise<Sessao> {
    const sessao = await this.findOne(id);

    if (dto.inicio || dto.fim) {
      const novoInicio = dto.inicio ? new Date(dto.inicio) : sessao.inicio;
      const novoFim = dto.fim ? new Date(dto.fim) : sessao.fim;
      this.validarPeriodo(novoInicio, novoFim);
      await this.verificarConflitoHorario(
        sessao.paciente.id,
        novoInicio,
        novoFim,
        sessao.id,
      );
      sessao.inicio = novoInicio;
      sessao.fim = novoFim;
    }

    if (dto.planoId) {
      const plano = await this.validarPlanoDoPaciente(
        dto.planoId,
        sessao.paciente.id,
      );
      sessao.plano = plano;
    }

    if (dto.local !== undefined) sessao.local = dto.local;
    if (dto.observacoes !== undefined) sessao.observacoes = dto.observacoes;
    if (dto.status) sessao.status = dto.status;

    return this.repo.save(sessao);
  }

  async remove(id: string): Promise<void> {
    const sessao = await this.findOne(id);
    await this.repo.remove(sessao);
  }
}
