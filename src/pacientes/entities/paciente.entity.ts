import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}