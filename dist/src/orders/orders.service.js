"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pagination_response_dto_1 = require("../pagination/pagination-response.dto");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
        this.allowedTransitions = {
            pending: ['confirmed', 'cancelled'],
            confirmed: ['processing', 'cancelled'],
            processing: ['shipped', 'cancelled'],
            shipped: ['delivered'],
            delivered: ['refunded'],
            cancelled: [],
            refunded: [],
        };
    }
    async create(createOrderDto) {
        const { items, ...orderData } = createOrderDto;
        return this.prisma.order.create({
            data: {
                ...orderData,
                items: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        actualPrice: item.actualPrice,
                        discountedPrice: item.discountedPrice,
                    })),
                },
            },
            include: {
                items: true,
                shippingAddress: true,
            },
        });
    }
    async findAll(pagination, profile_id) {
        const [data, total] = await this.prisma.$transaction([
            this.prisma.order.findMany({
                where: { customerProfileId: profile_id },
                include: {
                    items: true,
                    shippingAddress: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.order.count(),
        ]);
        return new pagination_response_dto_1.PaginationResponseDto(data, total, pagination.page, pagination.limit);
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: true,
                shippingAddress: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException(`Order with id ${id} not found`);
        return order;
    }
    async update(id, updateOrderDto) {
        const { items, ...orderData } = updateOrderDto;
        await this.findOne(id);
        return this.prisma.order.update({
            where: { id },
            data: {
                ...orderData,
                ...(items
                    ? {
                        items: {
                            deleteMany: {},
                            create: items.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                                actualPrice: item.actualPrice,
                                discountedPrice: item.discountedPrice,
                            })),
                        },
                    }
                    : {}),
            },
            include: {
                items: true,
                shippingAddress: true,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.order.delete({
            where: { id },
        });
    }
    async findByUser(profile_id) {
        return this.prisma.order.findMany({
            where: { customerProfileId: profile_id },
            include: {
                items: true,
                shippingAddress: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(id, status) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException(`Order with id ${id} not found`);
        return this.prisma.order.update({
            where: { id },
            data: { status },
        });
    }
    async updateTrackingDetails(orderId, trackingDetails) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order)
            throw new common_1.NotFoundException(`Order with id ${orderId} not found`);
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                trackingID: trackingDetails,
                status: 'shipped',
            },
            include: {
                items: true,
                shippingAddress: true,
            },
        });
    }
    async getOrders(dto) {
        const { status, categoryId, startDate, endDate, page, limit } = dto;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (startDate || endDate) {
            where.createdAt = {
                ...(startDate && { gte: new Date(startDate) }),
                ...(endDate && { lte: new Date(endDate) }),
            };
        }
        if (categoryId) {
            where.items = {
                some: {
                    product: {
                        categoryId,
                    },
                },
            };
        }
        const [orders, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                    CustomerProfile: true,
                    Payment: true,
                },
            }),
            this.prisma.order.count({ where }),
        ]);
        return new pagination_response_dto_1.PaginationResponseDto(orders, total, page, limit);
    }
    async updateOrderStatus(orderId, dto) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const currentStatus = order.status;
        const nextStatus = dto.status;
        if (!this.allowedTransitions[currentStatus].includes(nextStatus)) {
            throw new common_1.BadRequestException(`Invalid status transition from ${currentStatus} to ${nextStatus}`);
        }
        const updatedOrder = await this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: nextStatus,
                ...(dto.notes && { notes: dto.notes }),
            },
        });
        return {
            message: 'Order status updated successfully',
            order: updatedOrder,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map