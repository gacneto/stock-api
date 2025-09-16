import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    // Pedimos ao NestJS para injetar o repositório da entidade 'Product' aqui.
    // A partir de agora, `this.productRepository` tem todos os métodos para acessar a tabela 'products'.
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}

    async create(createProductDto: CreateProductDto): Promise<Product>{
        // Cria uma instância da nossa entidade `Product` com base nos dados do DTO.
        // Importante: Isso ainda NÃO salva no banco, apenas cria o objeto na memória.
        const product = this.productRepository.create(createProductDto);

        // Pega o objeto `product` que criamos e o salva de fato no banco de dados.
        // Esta operação é assíncrona, por isso retorna uma `Promise`.
        return this.productRepository.save(product);
    }

    // Busca um produto pelo seu ID.
    // Se o produto não for encontrado, lança uma exceção HTTP 404 (Not Found).
    // @param id O ID (uuid) do produto a ser buscado.
    async findOne(id: string): Promise<Product>{

        // O método .findOneBy() do repositório busca o primeiro registro que corresponde
        // ao critério fornecido (neste caso, o ID).
        const product = await this.productRepository.findOneBy({id: id});

        // Se o método acima não encontrar nada, ele retorna 'null'.
        // Nós verificamos isso e, se for o caso, lançamos um erro.
        if(!product){
            throw new NotFoundException(`Produto com o ID "${id}" não encontrado.`);
        }

        // Se o produto foi encontrado, nós o retornamos.
        return product;
    }

    // Este método busca todos os produtos no banco de dados.
    // Retorna uma promessa que, quando resolvida, conterá um array de produtos.
    async findAll(): Promise<Product[]>{

        // O método .find() do repositório, quando chamado sem argumentos,
        // automaticamente executa um "SELECT * FROM products".
        return this.productRepository.find();
    }

    async update(id:string, updateProductDto: UpdateProductDto): Promise<Product>{
        // O método preload é a forma mais segura de fazer um update.
        // 1. Ele primeiro busca no banco um produto com o 'id' fornecido.
        // 2. Se encontrar, ele mescla os dados do 'updateProductDto' com os dados existentes do produto.
        // 3. Se não encontrar o produto pelo 'id', ele retorna 'undefined'.
        const product = await this.productRepository.preload({
            id: id,
            ...updateProductDto,
        });

        // Verificamos se o preload retornou undefined (ou seja, não encontrou o produto)
        if(!product){
            throw new NotFoundException(`Produto com o ID "${id}" não encontrado para atualização.`);
        }

        // Se o produto foi encontrado e mesclado, nós o salvamos.
        // O TypeORM é inteligente e fará um UPDATE em vez de um INSERT.
        return this.productRepository.save(product);
    }

    async remove(id: string): Promise<void> {
    // O método .delete() do repositório executa um "DELETE FROM products WHERE id = ..."
    // Ele não retorna a entidade removida, mas sim um objeto com informações,
    // como o número de linhas afetadas.
    const result = await this.productRepository.delete(id);

    // Verificamos se alguma linha foi de fato afetada no banco.
    // Se 'affected' for 0, significa que nenhum produto com aquele ID foi encontrado.
    if (result.affected === 0) {
      throw new NotFoundException(`Produto com o ID "${id}" não encontrado para remoção.`);
    }

    // Uma função de remoção bem-sucedida não precisa retornar nada, por isso o tipo é Promise<void>.
  }
}
