import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth') // Rota base para este controller será '/auth'
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * O @UseGuards(AuthGuard('local')) é a mágica aqui.
   * Ele diz ao NestJS: "Antes de executar este método, use a estratégia 'local' do Passport".
   * A estratégia 'local' é a nossa LocalStrategy que acabamos de criar.
   * Ela vai automaticamente pegar o 'username' e 'password' do body,
   * rodar nossa função 'validate', e se tudo der certo, anexa o usuário ao 'req'.
   * Se a validação falhar, ele retorna um erro 401 Unauthorized automaticamente.
   */
  @UseGuards(AuthGuard('local'))
  @Post('login') // Rota final: POST /auth/login
  async login(@Request() req) {
    // Se a requisição chegou até aqui, o usuário já foi validado pela LocalStrategy.
    // O objeto do usuário está em req.user.
    // Agora só precisamos chamar o serviço para gerar o token.
    return this.authService.login(req.user);
  }
}