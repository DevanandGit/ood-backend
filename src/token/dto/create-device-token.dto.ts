import { IsString } from 'class-validator';

export class CreateDeviceTokenDto {
    @IsString()
    userId: string;

    @IsString()
    token: string;
}
