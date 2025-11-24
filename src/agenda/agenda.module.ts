import { Module } from '@nestjs/common';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';
import { Sessao } from './entities/sessao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { PlanosModule } from 'src/planos/planos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sessao]),
    PacientesModule,
    PlanosModule,
  ],
  controllers: [AgendaController],
  providers: [AgendaService],
  exports: [AgendaService]
})
export class AgendaModule {}
