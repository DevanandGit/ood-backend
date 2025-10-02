// src/product/dto/create-product.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

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
}
