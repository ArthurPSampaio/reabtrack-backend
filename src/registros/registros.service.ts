import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { PlanosService } from 'src/planos/planos.service';
import { Repository } from 'typeorm';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { Registro } from './entities/registro.entity';
import { UpdateRegistroDto } from './dto/update-registro.dto';

@Injectable()
export class RegistrosService {
  constructor(
    @InjectRepository(Registro)
    private readonly registrosRepository: Repository<Registro>,

    private readonly pacientesService: PacientesService,
    private readonly planosService: PlanosService,
  ) {}

  async create(createRegistroDto: CreateRegistroDto): Promise<Registro> {
    const { pacienteId, planoId, ...dadosDoRegistro } = createRegistroDto;

    const paciente = await this.pacientesService.findOne(pacienteId);

    const plano = await this.planosService.findOne(planoId);

    if (plano.paciente.id !== pacienteId) {
      // aqui é regra de negócio, então BadRequest faz mais sentido do que NotFound
      throw new BadRequestException(
        `O plano ${planoId} não pertence ao paciente ${pacienteId}.`,
      );
    }

    const dadosNovoRegistro: Partial<Registro> = {
      ...dadosDoRegistro,
      dataSessao: dadosDoRegistro.dataSessao
        ? new Date(dadosDoRegistro.dataSessao)
        : undefined,
      paciente,
      plano,
    };

    const novoRegistro = this.registrosRepository.create(dadosNovoRegistro);
    return this.registrosRepository.save(novoRegistro);
  }

  findAll(): Promise<Registro[]> {
    return this.registrosRepository.find({ order: { dataSessao: 'DESC' } });
  }

  async findOne(id: string): Promise<Registro> {
    const registro = await this.registrosRepository.findOne({ where: { id } });
    if (!registro)
      throw new NotFoundException(`Registro com o ID "${id}" não encontrado.`);
    return registro;
  }

  async findByPaciente(pacienteId: string): Promise<Registro[]> {
    await this.pacientesService.findOne(pacienteId);
    return this.registrosRepository.find({
      where: { paciente: { id: pacienteId } },
      order: { dataSessao: 'DESC' },
    });
  }

  async findByPlano(planoId: string): Promise<Registro[]> {
    await this.planosService.findOne(planoId);
    return this.registrosRepository.find({
      where: { plano: { id: planoId } },
      order: { dataSessao: 'DESC' },
    });
  }

  async update(id: string, dto: UpdateRegistroDto): Promise<Registro> {
    const registro = await this.findOne(id);

    if (dto.planoId) {
      const plano = await this.planosService.findOne(dto.planoId);
      if (plano.paciente.id !== registro.paciente.id) {
        throw new NotFoundException(
          `Plano ${dto.planoId} não pertence ao paciente deste registro`,
        );
      }
      registro.plano = plano;
    }

    Object.assign(registro, {
      escalaDor: dto.escalaDor,
      percepcaoEsforco: dto.percepcaoEsforco,
      conseguiuRealizarTudo: dto.conseguiuRealizarTudo,
      notasSubjetivas: dto.notasSubjetivas,
      notasObjetivas: dto.notasObjetivas,
      avaliacao: dto.avaliacao,
      planoProximaSessao: dto.planoProximaSessao,
      dataSessao: dto.dataSessao,
    });

    return this.registrosRepository.save(registro);
  }

  async remove(id: string): Promise<void> {
    const registro = await this.findOne(id);
    await this.registrosRepository.remove(registro);
  }
}
