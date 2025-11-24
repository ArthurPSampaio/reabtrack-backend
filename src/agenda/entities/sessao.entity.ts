import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Plano } from 'src/planos/entities/plano.entity';

export type StatusSessao = 'scheduled' | 'completed' | 'canceled' | 'no_show';

@Entity('sessoes')
export class Sessao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  inicio: Date;

  @Column({ type: 'timestamptz' })
  fim: Date;

  @Column({ type: 'varchar', length: 20, default: 'scheduled' })
  status: StatusSessao;

  @Column({ type: 'varchar', length: 120, nullable: true })
  local?: string;

  @Column({ type: 'text', nullable: true })
  observacoes?: string;

  @ManyToOne(() => Paciente, (p) => p.id, { eager: true })
  paciente: Paciente;

  @ManyToOne(() => Plano, (pl) => pl.id, { eager: true })
  plano: Plano;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
