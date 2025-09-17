import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/entities/role.enum';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard) // 1. Adiciona o RolesGuard
  @Roles(Role.Admin) // 2. Especifica que apenas Admins podem acessar
  // "Pegue o corpo (body) da requisição e valide-o usando as regras do CreateProductDto".
  // Se a validação passar, o corpo da requisição estará disponível na variável 'createProductDto'.
  // Se falhar, o ValidationPipe que ativamos antes retornará um erro 400 automaticamente.
  create(@Body() createProductDto: CreateProductDto) {
    // Ele delega toda a lógica de negócio para o productService.
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  // O decorator @Param('id') extrai o parâmetro 'id' da URL
  // e o injeta na variável `id` do método.
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get()
  findAll() {
    // Apenas chama o método do serviço e retorna o resultado.
    return this.productService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  // O decorator @HttpCode(HttpStatus.NO_CONTENT) faz o NestJS retornar o status 204
  // em caso de sucesso, que é a convenção para uma deleção bem-sucedida.
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
