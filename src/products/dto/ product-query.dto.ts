// product-query.dto.ts
import {
    IsOptional,
    IsString,
    IsNumberString,
    IsBooleanString,
} from 'class-validator';

export class ProductQueryDto {
    @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;

    // 🔎 Product name search
    @IsOptional()
    @IsString()
    search?: string;

    // 🗂 Category filter
    @IsOptional()
    @IsString()
    categoryId?: string;

    // 💰 Price range
    @IsOptional()
    @IsNumberString()
    minPrice?: string;

    @IsOptional()
    @IsNumberString()
    maxPrice?: string;

    // 📦 Size filter (e.g. S, M, L)
    @IsOptional()
    @IsString()
    size?: string;

    // ✅ Stock filter
    @IsOptional()
    @IsBooleanString()
    isStock?: string;

    @IsOptional()
    @IsBooleanString()
    isActive?: string;
}
