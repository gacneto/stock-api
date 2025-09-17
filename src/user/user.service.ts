// src/user/user.service.ts

import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // 1. Importe o bcrypt

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // 2. Criptografe a senha
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    // 3. Crie a nova entidade de usuário
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword, // 4. Salve a senha criptografada
    });

    try {
      // 5. Salve o novo usuário no banco de dados
      const savedUser = await this.userRepository.save(newUser);

      // 6. NUNCA retorne a senha, mesmo que seja o hash.
      const { password, ...result } = savedUser;
      return result;
    } catch (error) {
      // Trata o erro caso o username já exista (definimos como 'unique' na entidade)
      if (error.code === '23505') {
        // Código de erro de violação de unicidade do PostgreSQL
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // --- NOVO MÉTODO: REMOVER ---
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Usuário com o ID "${id}" não foi encontrado.`,
      );
    }
  }
}