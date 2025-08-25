import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { PlanosService } from 'src/planos/planos.service';
import { Repository } from 'typeorm';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { Registro } from './entities/registro.entity';

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

    const dadosNovoRegistro: Partial<Registro> = {
      ...dadosDoRegistro,
      paciente,
    };

    if (planoId) {
      const plano = await this.planosService.findOne(planoId);
      if (plano.paciente.id !== pacienteId) {
        throw new NotFoundException(
          `O Plano com ID "${planoId}" não pertence ao Paciente com ID "${pacienteId}".`,
        );
      }
      dadosNovoRegistro.plano = plano;
    }

    const novoRegistro = this.registrosRepository.create(dadosNovoRegistro);

    return this.registrosRepository.save(novoRegistro);
  }
}