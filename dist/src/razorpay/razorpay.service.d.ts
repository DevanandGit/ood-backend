import Razorpay from 'razorpay';
import { CreatePaymentIntentDto } from './dto/checkout.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class RazorpayService {
    private readonly razorpayClient;
    private prisma;
    constructor(razorpayClient: Razorpay, prisma: PrismaService);
    createOrder(dto: CreatePaymentIntentDto, customerProfileId: string): Promise<{
        message: string;
        order: {
            items: {
                id: string;
                quantity: number;
                discountedPrice: import("@prisma/client/runtime/library").Decimal;
                actualPrice: import("@prisma/client/runtime/library").Decimal;
                productId: string;
                orderId: string;
            }[];
        } & {
            id: string;
            orderNumber: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            shippingCost: import("@prisma/client/runtime/library").Decimal;
            taxAmount: import("@prisma/client/runtime/library").Decimal;
            discountAmount: import("@prisma/client/runtime/library").Decimal;
            notes: string | null;
            shippingAddressId: string | null;
            trackingID: string | null;
            createdAt: Date;
            updatedAt: Date;
            customerProfileId: string | null;
        };
        razorpayOrder: import("razorpay/dist/types/orders").Orders.RazorpayOrder;
    }>;
    verifyPaymentSignature(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string): Promise<{
        success: boolean;
        message: string;
        order?: undefined;
    } | {
        success: boolean;
        order: {
            id: string;
            orderNumber: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            shippingCost: import("@prisma/client/runtime/library").Decimal;
            taxAmount: import("@prisma/client/runtime/library").Decimal;
            discountAmount: import("@prisma/client/runtime/library").Decimal;
            notes: string | null;
            shippingAddressId: string | null;
            trackingID: string | null;
            createdAt: Date;
            updatedAt: Date;
            customerProfileId: string | null;
        };
        message?: undefined;
    }>;
}
