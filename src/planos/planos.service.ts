import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { Repository } from 'typeorm';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { Atividade } from './entities/atividade.entity';
import { Plano } from './entities/plano.entity';

@Injectable()
export class PlanosService {
  constructor(
    @InjectRepository(Plano)
    private readonly planosRepository: Repository<Plano>,

    private readonly pacientesService: PacientesService,
  ) {}

  async create(createPlanoDto: CreatePlanoDto): Promise<Plano> {
    const { pacienteId, atividades, ...dadosDoPlano } = createPlanoDto;

    const paciente = await this.pacientesService.findOne(pacienteId);

    const novoPlano = this.planosRepository.create({
      ...dadosDoPlano,
      paciente,
      atividades: atividades ? atividades.map((ativ) => ({ ...ativ } as Atividade)) : [],
    });

    return this.planosRepository.save(novoPlano);
  }

  findAll(): Promise<Plano[]> {
    return this.planosRepository.find({
      relations: ['atividades'],
    });
  }

  async findOne(id: string): Promise<Plano> {
    const plano = await this.planosRepository.findOne({
      where: { id },
      relations: ['atividades'],
    });

    if (!plano) {
      throw new NotFoundException(`Plano com o ID "${id}" não encontrado.`);
    }

    return plano;
  }

  async findAllByPaciente(pacienteId: string): Promise<Plano[]> {
    await this.pacientesService.findOne(pacienteId);

    return this.planosRepository.find({
      where: { paciente: { id: pacienteId } },
      relations: ['atividades'],
    });
  }
}