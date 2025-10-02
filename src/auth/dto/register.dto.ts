import { Roles } from '@prisma/client';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  otp: string;

  @IsDate()
  otpExpiration: Date;

  @IsBoolean()
  @IsOptional()
  is_verified?: boolean;
}
