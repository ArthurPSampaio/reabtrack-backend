import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Plano } from '../../planos/entities/plano.entity';

@Entity({ name: 'registros' })
export class Registro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'data_sessao', type: 'timestamp' })
  dataSessao: Date;

  @Column({ name: 'escala_dor', nullable: true })
  escalaDor: number;

  @Column({ name: 'percepcao_esforco', nullable: true })
  percepcaoEsforco: number;

  @Column({ name: 'conseguiu_realizar_tudo', default: false })
  conseguiuRealizarTudo: boolean;

  @Column({ name: 'notas_subjetivas', type: 'text', nullable: true })
  notasSubjetivas: string;

  @Column({ name: 'notas_objetivas', type: 'text', nullable: true })
  notasObjetivas: string;

  @Column({ name: 'avaliacao', type: 'text', nullable: true })
  avaliacao: string;

  @Column({ name: 'plano_proxima_sessao', type: 'text', nullable: true })
  planoProximaSessao: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.registros, { onDelete: 'CASCADE' })
  paciente: Paciente;

  @ManyToOne(() => Plano, (plano) => plano.registros, { onDelete: 'CASCADE' })
  plano: Plano;
}