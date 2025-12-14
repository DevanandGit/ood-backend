import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrderStatus } from '@prisma/client';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { OrderFilterDto } from './dto/fetch-orders.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {
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

  async findAll(pagination: PaginationDto, profile_id: string) {
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
    return new PaginationResponseDto(
      data,
      total,
      pagination.page,
      pagination.limit,
    );
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        shippingAddress: true,
      },
    });
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { items, ...orderData } = updateOrderDto;
    await this.findOne(id); // ensure exists
    return this.prisma.order.update({
      where: { id },
      data: {
        ...orderData,
        ...(items
          ? {
            items: {
              deleteMany: {}, // clear old items
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

  async remove(id: string) {
    await this.findOne(id); // ensure exists
    return this.prisma.order.delete({
      where: { id },
    });
  }

  async findByUser(profile_id: string) {
    return this.prisma.order.findMany({
      where: { customerProfileId: profile_id },
      include: {
        items: true,
        shippingAddress: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async updateTrackingDetails(orderId: string, trackingDetails: string) {
    // 1. Check if order exists
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order)
      throw new NotFoundException(`Order with id ${orderId} not found`);
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        trackingID: trackingDetails, // make sure your Order model has this field
        status: 'shipped', // or 'processing', depending on your workflow
      },
      include: {
        items: true,
        shippingAddress: true,
      },
    });
  }

  async getOrders(dto: OrderFilterDto) {
    const { status, categoryId, startDate, endDate, page, limit } = dto;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.createdAt = {
        ...(startDate && { gte: new Date(startDate) }),
        ...(endDate && { lte: new Date(endDate) }),
      };
    }

    // Category filter (via OrderItem → Product → Category)
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

    return new PaginationResponseDto(orders, total, page, limit);
  }


  private allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['processing', 'cancelled'],
    processing: ['shipped', 'cancelled'],
    shipped: ['delivered'],
    delivered: ['refunded'],
    cancelled: [],
    refunded: [],
  };

  async updateOrderStatus(orderId: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const currentStatus = order.status;
    const nextStatus = dto.status;

    if (!this.allowedTransitions[currentStatus].includes(nextStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${nextStatus}`,
      );
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
}
