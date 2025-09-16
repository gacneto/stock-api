import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Usamos 'localhost' porque a porta 3306 do container está exposta na sua máquina
      port: 3306,
      username: 'root',      // Credenciais do docker-compose.yml
      password: 'root',      // Credenciais do docker-compose.yml
      database: 'estoque_db',  // Nome do banco do docker-compose.yml

      // Encontra automaticamente todos os arquivos .entity.ts no projeto
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      // Sincroniza as entidades com o banco. Ótimo para dev, ruim para produção.
      // Ele criará a tabela 'products' para nós automaticamente!
      synchronize: true,
    }),
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
