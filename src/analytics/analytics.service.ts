
// analytics.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DateRangeDto } from './dto/analytics.dto';
import { PaymentStatus, OrderStatus } from '@prisma/client';

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) { }

    private getDateFilter(dto: DateRangeDto) {
        return {
            createdAt: {
                gte: new Date(dto.startDate),
                lte: new Date(dto.endDate),
            },
        };
    }

    // 1️⃣ TOTAL REVENUE
    async getTotalRevenue(dto: DateRangeDto) {
        const result = await this.prisma.order.aggregate({
            _sum: {
                totalAmount: true,
            },
            where: {
                ...this.getDateFilter(dto),
                paymentStatus: PaymentStatus.completed,
                status: {
                    notIn: [OrderStatus.cancelled, OrderStatus.refunded],
                },
            },
        });

        return {
            totalRevenue: result._sum.totalAmount ?? 0,
            currency: 'INR',
        };
    }

    // 2️⃣ TOTAL ORDERS COUNT
    async getOrdersCount(dto: DateRangeDto) {
        const count = await this.prisma.order.count({
            where: {
                ...this.getDateFilter(dto),
            },
        });

        return {
            totalOrders: count,
        };
    }

    // 3️⃣ TOTAL REFUNDS
    async getTotalRefunds(dto: DateRangeDto) {
        const result = await this.prisma.order.aggregate({
            _sum: {
                totalAmount: true,
            },
            where: {
                ...this.getDateFilter(dto),
                status: OrderStatus.refunded,
            },
        });

        return {
            totalRefundAmount: result._sum.totalAmount ?? 0,
            currency: 'INR',
        };
    }

    async getUsersCount(isActive?: string) {
        const where: any = {};

        if (isActive !== undefined) {
            where.is_active = isActive === 'true';
        }

        const count = await this.prisma.user.count({ where });

        return {
            totalUsers: count,
            filter: {
                isActive: isActive !== undefined ? where.is_active : 'ALL',
            },
        };
    }
}
