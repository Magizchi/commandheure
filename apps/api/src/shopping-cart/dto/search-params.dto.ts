import { IsIn, IsNumberString, IsOptional } from 'class-validator';
import { FindOptionsOrder, FindOptionsOrderValue } from "typeorm/find-options/FindOptionsOrder";
import { ShoppingCart } from '../entities/shopping-cart.entity';

export class SearchParamsDto {

    @IsOptional()
    @IsNumberString()
    take: number;

    @IsOptional()
    order: any;
}
