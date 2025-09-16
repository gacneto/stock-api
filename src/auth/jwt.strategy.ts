import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Diz ao Passport para extrair o token do cabeçalho 'Authorization' como um 'Bearer token'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Garante que o token não seja ignorado se estiver expirado
      ignoreExpiration: false,
      // Usa o segredo do nosso .env para verificar a assinatura do token
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * O Passport executa este método DEPOIS de verificar que o token é válido.
   * O que retornamos daqui será anexado ao objeto 'request' como 'req.user'.
   * @param payload O conteúdo que colocamos dentro do token ao fazer o login (id e username)
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}