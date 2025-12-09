import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { HttpStatus } from '@nestjs/common';
export declare class CouponService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCouponDto): Promise<{
        id: string;
        couponName: string;
        ValueType: import(".prisma/client").$Enums.CoupounValueType;
        Value: string;
        minimumSpent: import("@prisma/client/runtime/library").Decimal;
        usedByCount: number;
        usageLimitPerPerson: number;
        validFrom: string;
        ValidTill: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(query?: {
        onlyValid?: boolean;
        onlyExpired?: boolean;
        minSpent?: number;
    }): Promise<{
        id: string;
        couponName: string;
        ValueType: import(".prisma/client").$Enums.CoupounValueType;
        Value: string;
        minimumSpent: import("@prisma/client/runtime/library").Decimal;
        usedByCount: number;
        usageLimitPerPerson: number;
        validFrom: string;
        ValidTill: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        couponName: string;
        ValueType: import(".prisma/client").$Enums.CoupounValueType;
        Value: string;
        minimumSpent: import("@prisma/client/runtime/library").Decimal;
        usedByCount: number;
        usageLimitPerPerson: number;
        validFrom: string;
        ValidTill: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateCouponDto): Promise<{
        id: string;
        couponName: string;
        ValueType: import(".prisma/client").$Enums.CoupounValueType;
        Value: string;
        minimumSpent: import("@prisma/client/runtime/library").Decimal;
        usedByCount: number;
        usageLimitPerPerson: number;
        validFrom: string;
        ValidTill: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        couponName: string;
        ValueType: import(".prisma/client").$Enums.CoupounValueType;
        Value: string;
        minimumSpent: import("@prisma/client/runtime/library").Decimal;
        usedByCount: number;
        usageLimitPerPerson: number;
        validFrom: string;
        ValidTill: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findApplicableCoupons(profile_id: string): Promise<any[]>;
    applyCoupon(profile_id: string, coupon_id: string, orderAmount?: number): Promise<{
        message: string;
        discount: number;
        status: HttpStatus;
    }>;
}
