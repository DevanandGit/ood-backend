import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(role?: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    CustomerProfile(id: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        CustomerProfile: {
            addresses: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                customerProfileId: string;
                address: string;
                city: string;
                state: string;
                postalCode: string;
                country: string;
                phone: string;
                isDefault: boolean;
            }[];
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                rating: number;
                comment: string | null;
                customerProfileId: string | null;
            }[];
            couponUsages: {
                id: string;
                customerProfileId: string | null;
                usedAt: Date;
                couponId: string;
            }[];
            orders: {
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
                trackingID: string | null;
                shippingAddressId: string | null;
            }[];
            cart: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string | null;
                quantity: number;
            }[];
            BankDetails: {
                id: string;
                customerProfileId: string | null;
                accountNumber: string;
                accountHolderName: string;
                ifscCode: string;
            }[];
            Wishlist: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string;
            }[];
        };
    }>;
    AdminProfile(id: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        AdminProfile: {
            notes: string;
        };
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        CustomerProfile: {
            addresses: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                customerProfileId: string;
                address: string;
                city: string;
                state: string;
                postalCode: string;
                country: string;
                phone: string;
                isDefault: boolean;
            }[];
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                rating: number;
                comment: string | null;
                customerProfileId: string | null;
            }[];
            couponUsages: {
                id: string;
                customerProfileId: string | null;
                usedAt: Date;
                couponId: string;
            }[];
            orders: {
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
                trackingID: string | null;
                shippingAddressId: string | null;
            }[];
            cart: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string | null;
                quantity: number;
            }[];
            BankDetails: {
                id: string;
                customerProfileId: string | null;
                accountNumber: string;
                accountHolderName: string;
                ifscCode: string;
            }[];
            Wishlist: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string;
            }[];
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
