import { IsIn } from 'class-validator';

export class SearchParamsDto {

    @IsIn([
        'ASC',
        'DESC',
        undefined
    ])
    search: 'ASC' | 'DESC' | null | undefined;
}
