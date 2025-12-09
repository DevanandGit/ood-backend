import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OtpVerifyDto } from './dto/otp-verify.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    sendOtp(loginDto: LoginDto): Promise<{
        message: string;
        data: string;
    }>;
    verifyOtp(otpVerifyDto: OtpVerifyDto): Promise<{
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            otp: string | null;
            expiresAt: Date | null;
            password: string | null;
            is_verified: boolean;
            createdAt: Date;
            updatedAt: Date;
            lastLogin: Date | null;
        };
        accessToken: string;
        message: string;
        status: number;
    }>;
    getAdminProfile(req: any): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        AdminProfile: {
            notes: string;
        };
    }>;
    getCustomerProfile(req: any): Promise<{
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
                address: string;
                customerProfileId: string;
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
    register(dto: LoginDto): Promise<{
        message: string;
        data: string;
    }>;
    profile(req: any): Promise<{
        id: string;
        userId: string;
        notes: string | null;
    }>;
}
