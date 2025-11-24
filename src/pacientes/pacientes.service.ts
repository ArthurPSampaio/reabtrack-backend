import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

import { PaginatedResult } from 'src/common/interfaces/paginated-result.interface';

type FindAllParams = {
  nome?: string;
  diagnostico?: string;
  page?: number;
  limit?: number;
};

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    const paciente = this.pacienteRepository.create(createPacienteDto);
    return this.pacienteRepository.save(paciente);
  }

  async findAll(
    params: FindAllParams = {},
  ): Promise<PaginatedResult<Paciente>> {
    const { nome, diagnostico } = params;
    const page = Math.max(1, Number(params.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(params.limit ?? 20))); // trava entre 1 e 100
    const skip = (page - 1) * limit;

    const where: any = {};
    if (nome) where.nome = ILike(`%${nome}%`);
    if (diagnostico) where.diagnostico = ILike(`%${diagnostico}%`);

    const [data, total] = await this.pacienteRepository.findAndCount({
      where,
      order: { nome: 'ASC' },
      take: limit,
      skip,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOneBy({ id });

    if (!paciente) {
      throw new NotFoundException(`Paciente com id "${id}" não encontrado`);
    }

    return paciente;
  }

  async update(
    id: string,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<Paciente> {
    const paciente = await this.pacienteRepository.preload({
      id,
      ...updatePacienteDto,
    });

    if (!paciente) {
      throw new NotFoundException(`Paciente com id "${id}" não encontrado`);
    }

    return this.pacienteRepository.save(paciente);
  }

  async remove(id: string): Promise<void> {
    const paciente = await this.findOne(id);

    await this.pacienteRepository.remove(paciente);
  }
}
