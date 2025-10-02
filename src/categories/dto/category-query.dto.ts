// category-query.dto.ts
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class CategoryQueryDto {
    @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    parentId?: string; // filter by parent category
}
