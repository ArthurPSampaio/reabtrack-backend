import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { DataSource, Repository } from 'typeorm';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { Atividade } from './entities/atividade.entity';
import { Plano } from './entities/plano.entity';
import { UpdatePlanoDto } from './dto/update-planos.dto';

@Injectable()
export class PlanosService {
  constructor(
    @InjectRepository(Plano)
    private readonly planosRepository: Repository<Plano>,

    @InjectRepository(Atividade)
    private readonly atividadesRepository: Repository<Atividade>,

    private readonly pacientesService: PacientesService,

    private readonly dataSource: DataSource,
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

  async update(id: string, updatePlanoDto: UpdatePlanoDto): Promise<Plano> {
    const { atividades, ...dadosDoPlano } = updatePlanoDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const plano = await queryRunner.manager.findOne(Plano, {
        where: { id },
        relations: ['atividades'],
      });

      if (!plano) {
        throw new NotFoundException(`Plano com o ID "${id}" não encontrado.`);
      }

      queryRunner.manager.merge(Plano, plano, dadosDoPlano);
      await queryRunner.manager.save(plano);

      if (atividades) {
        await queryRunner.manager.remove(plano.atividades);

        const novasAtividades = atividades.map(dto => 
          queryRunner.manager.create(Atividade, { ...dto, plano })
        );
        await queryRunner.manager.save(novasAtividades);
      }
      
      await queryRunner.commitTransaction();

      return this.findOne(id);

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<void> {
    const plano = await this.findOne(id);
    await this.planosRepository.remove(plano);
  }
}