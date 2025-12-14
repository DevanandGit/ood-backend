// dto/order-filter.dto.ts
import { IsOptional, IsEnum, IsISO8601, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '@prisma/client';

export class OrderFilterDto {
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    categoryId?: string;

    @IsOptional()
    @IsISO8601()
    startDate?: string;

    @IsOptional()
    @IsISO8601()
    endDate?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}
