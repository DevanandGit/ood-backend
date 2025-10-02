import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(role?: string): Promise<{
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    CustomerProfile(id: string): Promise<{
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
        CustomerProfile: {
            addresses: {
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
            }[];
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                productId: string;
                rating: number;
                comment: string | null;
            }[];
            couponUsages: {
                id: string;
                customerProfileId: string | null;
                couponId: string;
                usedAt: Date;
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
                shippingAddressId: string | null;
                trackingID: string | null;
            }[];
            cart: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                productId: string;
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
                customerProfileId: string;
                productId: string;
            }[];
        };
    }>;
    AdminProfile(id: string): Promise<{
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
        AdminProfile: {
            notes: string;
        };
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
        CustomerProfile: {
            addresses: {
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
            }[];
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                productId: string;
                rating: number;
                comment: string | null;
            }[];
            couponUsages: {
                id: string;
                customerProfileId: string | null;
                couponId: string;
                usedAt: Date;
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
                shippingAddressId: string | null;
                trackingID: string | null;
            }[];
            cart: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                productId: string;
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
                customerProfileId: string;
                productId: string;
            }[];
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
