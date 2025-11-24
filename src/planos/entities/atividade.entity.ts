import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plano } from './plano.entity';

export enum TipoAtividade {
  FORTALECIMENTO = 'Fortalecimento',
  ALONGAMENTO = 'Alongamento',
  AEROBICO = 'Aeróbico',
  EQUILIBRIO = 'Equilíbrio',
  OUTRO = 'Outro',
}

@Entity({ name: 'atividades' })
export class Atividade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'enum', enum: TipoAtividade, default: TipoAtividade.OUTRO })
  tipo: TipoAtividade;

  @Column({ nullable: true })
  series: number;

  @Column({ nullable: true })
  repeticoes: number;

  @Column({ nullable: true })
  frequencia: string;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @ManyToOne(() => Plano, (plano) => plano.atividades)
  plano: Plano;
}