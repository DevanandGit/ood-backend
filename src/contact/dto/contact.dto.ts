import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateContactDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    subject?: string;

    @IsString()
    message: string;
}
