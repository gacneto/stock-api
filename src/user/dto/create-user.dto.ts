import { IsString, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../entities/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  password: string;

  @IsEnum(Role) // Garante que o valor seja um dos definidos no nosso Enum ('admin' ou 'user')
  @IsOptional() // Torna o campo opcional. Se não for enviado, não dá erro.
  role?: Role;
}