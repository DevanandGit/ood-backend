// src/product/dto/create-product.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, IsObject } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  discountedPrice: number;

  @Type(() => Number)
  @IsNumber()
  actualPrice: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  stockCount?: number;

  @IsOptional()
  @IsBoolean()
  isStock?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsString()
  categoryId: string;


  @Transform(({ value }) => {
    if (!value) return {};
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);     // <-- parses the JSON string from form-data
      } catch {
        return {};                    // or throw if you prefer
      }
    }
    return value;
  })
  @IsObject()
  sizeAndQuantity: Record<string, number>;
}
