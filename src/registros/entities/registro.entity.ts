import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Plano } from '../../planos/entities/plano.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'registros' })
export class Registro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'data_sessao' })
  dataSessao: Date;

  @Column({ type: 'int', nullable: true })
  escalaDor: number;

  @Column({ type: 'int', nullable: true })
  percepcaoEsforco: number;

  @Column({ default: true })
  conseguiuRealizarTudo: boolean;

  @Column({ type: 'text', nullable: true })
  notasSubjetivas: string;

  @Column({ type: 'text', nullable: true })
  notasObjetivas: string;

  @Column({ type: 'text', nullable: true })
  avaliacao: string;

  @Column({ type: 'text', name: 'plano_proxima_sessao', nullable: true })
  planoProximaSessao: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.registros, { eager: true })
  paciente: Paciente;

  @ManyToOne(() => Plano, (plano) => plano.registros, {
    nullable: true,
    eager: true,
  })
  plano: Plano;
}