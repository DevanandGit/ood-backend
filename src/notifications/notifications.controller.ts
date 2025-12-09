import {
    Controller, Get, Post, Body, Param, Patch, Delete, Query
} from '@nestjs/common';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notifications.dto';
import { NotificationService } from './notifications.service';


@Controller({
    path: 'notifications',
    version: '1',
})
export class NotificationController {
    constructor(private readonly service: NotificationService) { }

    @Post()
    create(@Body() dto: CreateNotificationDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll(@Query('userId') userId?: string) {
        return this.service.findAll(userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
        return this.service.update(id, dto);
    }

    @Patch(':id/read')
    markAsRead(@Param('id') id: string) {
        return this.service.markAsRead(id);
    }

    @Delete(':id')
    softDelete(@Param('id') id: string) {
        return this.service.softDelete(id);
    }

    @Post('send-test/:userId')
    sendTest(@Param('userId') userId: string) {
        return this.service.sendNow(userId);
    }
}
