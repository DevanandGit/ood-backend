import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { AdminLoginDto, LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly usersService;
    private readonly jwtService;
    private readonly mailerService;
    constructor(prisma: PrismaService, usersService: UsersService, jwtService: JwtService, mailerService: MailerService);
    sendOtp(loginDto: LoginDto): Promise<{
        message: string;
        data: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            otp: string | null;
            expiresAt: Date | null;
            password: string | null;
            is_verified: boolean;
            is_active: boolean;
            lastLogin: Date | null;
        };
        accessToken: string;
        message: string;
        status: number;
    }>;
    getAdminProfile(id: string, role: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        AdminProfile: {
            notes: string;
        };
    }>;
    getCustomerProfile(id: string, role: string): Promise<{
        id: string;
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
                customerProfileId: string | null;
                rating: number;
                comment: string | null;
            }[];
            couponUsages: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                customerProfileId: string | null;
                usedAt: Date;
                couponId: string;
            }[];
            orders: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
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
                customerProfileId: string | null;
            }[];
            cart: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                customerProfileId: string | null;
                quantity: number;
                sizeId: string;
            }[];
            BankDetails: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
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
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    register(dto: AdminLoginDto): Promise<{
        message: string;
        data: {
            access_token: string;
            user: {
                id: string;
                email: string;
                role: import(".prisma/client").$Enums.Role;
            };
        };
        status: HttpStatus;
    }>;
    Adminlogin(dto: AdminLoginDto): Promise<{
        message: string;
        data: {
            access_token: string;
            user: {
                id: string;
                email: string;
                role: import(".prisma/client").$Enums.Role;
            };
        };
        status: HttpStatus;
    }>;
    getProfile(id: string, role: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
    }>;
    getMe(userId: string): Promise<{
        user: {
            id: string;
            createdAt: Date;
            CustomerProfile: {
                id: string;
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
            };
            email: string;
            role: import(".prisma/client").$Enums.Role;
            is_verified: boolean;
        };
    }>;
    updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    updateCustomerProfile(userId: string, data: any): Promise<{
        user: {
            id: string;
            createdAt: Date;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
        message: string;
    }>;
}
