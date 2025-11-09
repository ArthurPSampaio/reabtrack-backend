import { forwardRef, Module } from '@nestjs/common';
import { RegistrosController } from './registros.controller';
import { RegistrosService } from './registros.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from './entities/registro.entity';
import { PlanosModule } from 'src/planos/planos.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Registro]),
    PlanosModule,
    PacientesModule,
  ],
  controllers: [RegistrosController],
  providers: [RegistrosService],
  exports: [RegistrosService]
})
export class RegistrosModule {}
