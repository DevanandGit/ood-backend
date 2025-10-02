import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrderStatus } from '@prisma/client';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        items: {
            id: string;
            productId: string;
            quantity: number;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        }[];
        shippingAddress: {
            address: string;
            name: string;
            phone: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerProfileId: string;
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
    findAll(pagination: PaginationDto, req: any): Promise<import("../pagination/pagination-response.dto").PaginationResponseDto<{
        items: {
            id: string;
            productId: string;
            quantity: number;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        }[];
        shippingAddress: {
            address: string;
            name: string;
            phone: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerProfileId: string;
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
    findByUser(profile_id: string): Promise<({
        items: {
            id: string;
            productId: string;
            quantity: number;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        }[];
        shippingAddress: {
            address: string;
            name: string;
            phone: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerProfileId: string;
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
    findOne(id: string): Promise<{
        items: {
            id: string;
            productId: string;
            quantity: number;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        }[];
        shippingAddress: {
            address: string;
            name: string;
            phone: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerProfileId: string;
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
            productId: string;
            quantity: number;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        }[];
        shippingAddress: {
            address: string;
            name: string;
            phone: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerProfileId: string;
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
            productId: string;
            quantity: number;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        }[];
        shippingAddress: {
            address: string;
            name: string;
            phone: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerProfileId: string;
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
