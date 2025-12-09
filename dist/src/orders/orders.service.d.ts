import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrderStatus } from '@prisma/client';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        items: {
            id: string;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
        shippingAddress: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            customerProfileId: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string;
            isDefault: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        customerProfileId: string | null;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string | null;
        trackingID: string | null;
    }>;
    findAll(pagination: PaginationDto, profile_id: string): Promise<PaginationResponseDto<{
        items: {
            id: string;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
        shippingAddress: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            customerProfileId: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string;
            isDefault: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        customerProfileId: string | null;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string | null;
        trackingID: string | null;
    }>>;
    findOne(id: string): Promise<{
        items: {
            id: string;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
        shippingAddress: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            customerProfileId: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string;
            isDefault: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        customerProfileId: string | null;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string | null;
        trackingID: string | null;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        items: {
            id: string;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
        shippingAddress: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            customerProfileId: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string;
            isDefault: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        customerProfileId: string | null;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string | null;
        trackingID: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        customerProfileId: string | null;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string | null;
        trackingID: string | null;
    }>;
    findByUser(profile_id: string): Promise<({
        items: {
            id: string;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
        shippingAddress: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            customerProfileId: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string;
            isDefault: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        customerProfileId: string | null;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string | null;
        trackingID: string | null;
    })[]>;
    updateStatus(id: string, status: OrderStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        customerProfileId: string | null;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string | null;
        trackingID: string | null;
    }>;
    updateTrackingDetails(orderId: string, trackingDetails: string): Promise<{
        items: {
            id: string;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
        shippingAddress: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            customerProfileId: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string;
            isDefault: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        customerProfileId: string | null;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string | null;
        trackingID: string | null;
    }>;
}
