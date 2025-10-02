import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly usersService;
    private readonly jwtService;
    private readonly mailerService;
    constructor(prisma: PrismaService, usersService: UsersService, jwtService: JwtService, mailerService: MailerService);
    sendOtp(loginDto: LoginDto): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        user: {
            email: string;
            id: string;
            role: import(".prisma/client").$Enums.Roles;
            otp: string | null;
            expiresAt: Date | null;
            is_verified: boolean;
            createdAt: Date;
            updatedAt: Date;
            lastLogin: Date | null;
        };
        accessToken: string;
        message: string;
        status: number;
    }>;
    getAdminProfile(id: string, role: string): Promise<{
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Roles;
        createdAt: Date;
        updatedAt: Date;
        AdminProfile: {
            notes: string;
        };
    }>;
    getCustomerProfile(id: string, role: string): Promise<{
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
}
