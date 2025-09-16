import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateProductDto{
    // @IsString() -> Garante que o valor seja um texto.
    // @IsNotEmpty() -> Garante que o texto não esteja vazio.
    // { message: '...' } -> Permite customizar a mensagem de erro.
    @IsString({ message: 'O nome do produto deve ser um texto.'})
    @IsNotEmpty({message: 'O nome do produto não pode estar vazio.'})
    @MaxLength(100,{message: 'O nome não pode ter mais que 100 caracteres.'})
    name: string;

    // @IsOptional() -> Diz que este campo não é obrigatório.
    @IsString()
    @IsOptional()
    description?: string;

    // @IsNumber() -> Garante que o valor seja um número.
    // { maxDecimalPlaces: 2 } -> Opção para garantir que seja um valor monetário.
    // @Min(0) -> Garante que o número não seja negativo.
    @IsNumber({maxDecimalPlaces: 2}, {message: 'O preço deve ser um número com até 2 casas decimais.'})
    @Min(0, { message: 'O preço não pode ser negativo.' })
    price: number;

    @IsNumber({}, { message: 'O estoque deve ser um número inteiro.'})
    @Min(0, { message: 'O estoque não pode ser negativo.' })
    stock: number;
}