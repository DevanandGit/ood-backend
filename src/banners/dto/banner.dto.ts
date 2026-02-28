import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateBannerDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    subtitle?: string;

    @IsString()
    @IsOptional()
    mediaUrl?: string;

    @IsString()
    @IsOptional()
    mediaType?: string;

    @IsString()
    @IsOptional()
    ctaText?: string;

    @IsString()
    @IsOptional()
    ctaLink?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsInt()
    @IsOptional()
    sortOrder?: number;
}

export class UpdateBannerDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    subtitle?: string;

    @IsString()
    @IsOptional()
    mediaUrl?: string;

    @IsString()
    @IsOptional()
    mediaType?: string;

    @IsString()
    @IsOptional()
    ctaText?: string;

    @IsString()
    @IsOptional()
    ctaLink?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsInt()
    @IsOptional()
    sortOrder?: number;
}
