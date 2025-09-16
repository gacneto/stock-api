import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use o helmet para adicionar cabeçalhos de segurança
  app.use(helmet());

  // Habilite o CORS para permitir requisições de outros domínios (nosso frontend)
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    // whitelist: true -> Remove propriedades que não existem no DTO. Ótimo para segurança.
    whitelist: true,

    // forbidNonWhitelisted: true -> Lança um erro se propriedades extras forem enviadas.
    forbidNonWhitelisted: true,

    // transform: true -> Tenta transformar os dados para os tipos do DTO (ex: string "25" vira o número 25).
    transform: true,
  }));

  // A porta será 3000 localmente, ou a porta definida pelo serviço de deploy
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`); // Log para saber a porta
}
bootstrap();
