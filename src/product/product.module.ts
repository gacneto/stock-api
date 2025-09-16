import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Usa TypeOrmModule.forFeature() para "registrar" a entidade Product dentro deste módulo.                                                 
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
