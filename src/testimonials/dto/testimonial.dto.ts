import { IsString, IsInt, Min, Max, IsOptional, IsBoolean } from 'class-validator';

export class CreateTestimonialDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    comment: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsInt()
    @IsOptional()
    sortOrder?: number;
}

export class UpdateTestimonialDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    rating?: number;

    @IsString()
    @IsOptional()
    comment?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsInt()
    @IsOptional()
    sortOrder?: number;
}
