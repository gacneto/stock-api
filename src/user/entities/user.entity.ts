import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true }) // unique: true para garantir que não existam dois usuários com o mesmo nome
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string; // Iremos salvar a senha HASHED aqui, nunca em texto puro!

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
}