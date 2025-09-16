import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // O Passport, por padrão, espera os campos 'username' e 'password' no body da requisição.
    super();
  }

  /**
   * O NestJS/Passport chamará este método automaticamente
   * com o username e password extraídos do corpo da requisição.
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      // Se o serviço retornar null, lançamos uma exceção que resultará em um erro HTTP 401 Unauthorized.
      throw new UnauthorizedException('Credenciais inválidas');
    }
    // Se a validação for bem-sucedida, o Passport anexa o objeto do usuário à requisição (req.user).
    return user;
  }
}