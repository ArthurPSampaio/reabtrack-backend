import { Module } from '@nestjs/common';
import { PlanosController } from './planos.controller';
import { PlanosService } from './planos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plano } from './entities/plano.entity';
import { Atividade } from './entities/atividade.entity';
import { PacientesModule } from 'src/pacientes/pacientes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plano, Atividade]), PacientesModule],
  controllers: [PlanosController],
  providers: [PlanosService]
})
export class PlanosModule {}
