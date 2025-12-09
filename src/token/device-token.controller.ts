import {
    Controller, Post, Body, Get, Param, Delete
} from '@nestjs/common';
import { DeviceTokenService } from './device-token.service';
import { CreateDeviceTokenDto } from './dto/create-device-token.dto';

@Controller({
    path: 'device-tokens',
    version: '1',
})
export class DeviceTokenController {
    constructor(private readonly service: DeviceTokenService) { }

    @Post()
    register(@Body() dto: CreateDeviceTokenDto) {
        return this.service.register(dto);
    }

    @Get(':userId')
    listForUser(@Param('userId') userId: string) {
        return this.service.findByUser(userId);
    }

    @Delete(':token')
    remove(@Param('token') token: string) {
        return this.service.delete(token);
    }
}
