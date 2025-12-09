import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString, IsDateString } from "class-validator";

export class CreateNotificationDto {

    @IsOptional() @IsString()
    userId?: string;

    @IsString()
    title: string;


    @IsString()
    body: string;


    @IsOptional() @IsString()
    icon?: string;


    @IsOptional() @IsDateString()
    scheduledAt?: string;

    @IsOptional()
    channels?: any[];
}

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) { }
