import { IsInt, Max, Min } from 'class-validator';

export class CreateShoppingCartDto {

    @IsInt()
    @Min(0)
    @Max(200)
    quantity: number;

    productId: number;
}
