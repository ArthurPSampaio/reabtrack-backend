import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Plano } from '../../planos/entities/plano.entity';
import { Registro } from 'src/registros/entities/registro.entity';

export enum GeneroPaciente {
  MASCULINO = 'Masculino',
  FEMININO = 'Feminino',
}

@Entity({ name: 'pacientes' })
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ type: 'date', name: 'data_nascimento' })
  dataNascimento: Date;

  @Column({ type: 'enum', enum: GeneroPaciente })
  genero: GeneroPaciente;

  @Column()
  diagnostico: string;

  @Column()
  sintomas: string;

  @OneToMany(() => Plano, (plano) => plano.paciente, { onDelete: 'CASCADE' })
  planos: Plano[];

  @OneToMany(() => Registro, (registro) => registro.paciente, { onDelete: 'CASCADE' })
  registros: Registro[];
}