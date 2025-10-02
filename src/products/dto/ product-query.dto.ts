// product-query.dto.ts
import { IsOptional, IsString, IsNumberString, IsBooleanString } from 'class-validator';

export class ProductQueryDto {
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
    categoryId?: string;

    @IsOptional()
    @IsBooleanString()
    isActive?: string;

    @IsOptional()
    @IsBooleanString()
    isStock?: string;
}
