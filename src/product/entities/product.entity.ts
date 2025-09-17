import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../user/entities/role.enum';

// O decorator @Entity() diz ao TypeORM: "Esta classe é um modelo de uma tabela do banco de dados".
@Entity({ name: 'products' }) // Opcional: podemos dar um nome específico para a tabela.
export class Product {
  // @PrimaryGeneratedColumn diz que esta é a coluna de chave primária.
  // 'uuid' significa que o ID será um texto único universal, ex: "a1b2c3d4-..."
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column() marca uma propriedade como uma coluna na tabela.
  @Column({ type: 'varchar', length: 100, nullable: false }) // varchar = texto com limite de tamanho
  name: string; // nullable: false = campo obrigatório

  @Column({ type: 'text', nullable: true }) // text = texto longo, nullable: true = campo opcional
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) // decimal = número com casas decimais
  price: number;

  @Column({ type: 'int', default: 0 }) // int = número inteiro
  stock: number;

  // Estes são decorators "mágicos". O TypeORM vai preenchê-los automaticamente.
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date; // Armazena a data e hora de quando o registro foi criado.

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date; // Armazena a data e hora da última atualização do registro.
}