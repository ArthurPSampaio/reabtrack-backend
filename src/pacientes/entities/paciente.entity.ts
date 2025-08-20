import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Plano } from '../../planos/entities/plano.entity';

@Entity({ name: 'pacientes' }) 
export class Paciente {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column() 
  nome: string;

  @Column()
  idade: number;

  @Column()
  genero: string;

  @Column()
  diagnostico: string;

  @Column()
  sintomas: string;

  @OneToMany(() => Plano, (plano) => plano.paciente)
  planos: Plano[];
}