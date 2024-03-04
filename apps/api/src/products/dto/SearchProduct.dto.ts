import { IsString } from 'class-validator';

export class SearchProductsDto {

    @IsString()
    search: string;
}
