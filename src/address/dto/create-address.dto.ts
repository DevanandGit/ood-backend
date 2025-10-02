import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAddressDto {


  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;

  @IsString()
  phone?: string;

  @IsBoolean()
  isDefault?: boolean;
}
