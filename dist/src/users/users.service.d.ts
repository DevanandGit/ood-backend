import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(role?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    CustomerProfile(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        CustomerProfile: {
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string | null;
                rating: number;
                comment: string | null;
            }[];
            Wishlist: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string;
            }[];
            addresses: {
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
                productId: string;
                quantity: number;
                customerProfileId: string | null;
            }[];
            BankDetails: {
                id: string;
                customerProfileId: string | null;
                accountNumber: string;
                accountHolderName: string;
                ifscCode: string;
            }[];
        };
    }>;
    AdminProfile(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        AdminProfile: {
            notes: string;
        };
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.Role;
        CustomerProfile: {
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string | null;
                rating: number;
                comment: string | null;
            }[];
            Wishlist: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string;
            }[];
            addresses: {
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
                productId: string;
                quantity: number;
                customerProfileId: string | null;
            }[];
            BankDetails: {
                id: string;
                customerProfileId: string | null;
                accountNumber: string;
                accountHolderName: string;
                ifscCode: string;
            }[];
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
