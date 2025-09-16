import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// A classe UpdateProductDto herda todas as validações da CreateProductDto,
// mas o PartialType() torna cada uma delas opcional.
export class UpdateProductDto extends PartialType(CreateProductDto) {}