import { Paciente } from '../../pacientes/entities/paciente.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Atividade } from './atividade.entity';
import { Registro } from 'src/registros/entities/registro.entity';

export enum StatusPlano {
  ATIVO = 'Ativo',
  CONCLUIDO = 'Concluído',
  CANCELADO = 'Cancelado',
}

@Entity({ name: 'planos' })
export class Plano {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'objetivo_geral' })
  objetivoGeral: string;

  @Column({ name: 'diagnostico_relacionado' })
  diagnosticoRelacionado: string;

  @CreateDateColumn({ name: 'data_inicio' })
  dataInicio: Date;

  @Column({ name: 'data_fim_prevista', type: 'date', nullable: true })
  dataFimPrevista: Date;

  @Column({ type: 'enum', enum: StatusPlano, default: StatusPlano.ATIVO })
  status: StatusPlano;

  @ManyToOne(() => Paciente, (paciente) => paciente.planos, { eager: true })
  paciente: Paciente;

  @OneToMany(() => Atividade, (atividade) => atividade.plano, { cascade: true })
  atividades: Atividade[];

  @OneToMany(() => Registro, (registro) => registro.plano)
  registros: Registro[];
}