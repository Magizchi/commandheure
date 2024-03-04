import { IsEnum } from 'class-validator';
import { CategoryModel } from '../models/ModelsProducts';

export class GetByCategoryDto {

    @IsEnum(CategoryModel)
    byCategory: string;
}
