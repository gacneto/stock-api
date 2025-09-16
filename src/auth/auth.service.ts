import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida se as credenciais do usuário (username e password) estão corretas.
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Se a senha bater, retorna o usuário sem a senha
      const { password, ...result } = user;
      return result;
    }
    // Se não encontrar o usuário ou a senha não bater, retorna null
    return null;
  }

  /**
   * Gera um token JWT para um usuário validado.
   */
  async login(user: Omit<User, 'password'>) {
    // O 'payload' é a informação que queremos guardar dentro do token
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}