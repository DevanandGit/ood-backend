// analytics.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { DateRangeDto } from './dto/analytics.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.ADMIN)
@Controller('admin/analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('dashboard')
    getDashboardStats() {
        return this.analyticsService.getDashboardStats();
    }

    @Get('revenue')
    getTotalRevenue(@Query() dto: DateRangeDto) {
        return this.analyticsService.getTotalRevenue(dto);
    }

    @Get('orders-count')
    getOrdersCount(@Query() dto: DateRangeDto) {
        return this.analyticsService.getOrdersCount(dto);
    }

    @Get('refunds')
    getTotalRefunds(@Query() dto: DateRangeDto) {
        return this.analyticsService.getTotalRefunds(dto);
    }

    @Get('users-count')
    getUsersCount(
        @Query('isActive') isActive?: string,
    ) {
        return this.analyticsService.getUsersCount(isActive);
    }
}
