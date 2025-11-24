import { Module } from '@nestjs/common';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  exports: [PacientesService],
  controllers: [PacientesController],
  providers: [PacientesService]
})
export class PacientesModule {}
