"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
let CouponService = class CouponService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.coupon.create({
            data: dto,
        });
    }
    async findAll(query) {
        const now = new Date();
        const coupons = await this.prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' },
            where: {
                ...(query?.onlyValid && {
                    validFrom: { lte: now.toISOString() },
                    ValidTill: { gte: now.toISOString() },
                }),
                ...(query?.onlyExpired && {
                    ValidTill: { lt: now.toISOString() },
                }),
                ...(query?.minSpent && {
                    minimumSpent: { lte: query.minSpent },
                }),
            },
        });
        return coupons;
    }
    async findOne(id) {
        const coupon = await this.prisma.coupon.findUnique({ where: { id } });
        if (!coupon)
            throw new common_1.NotFoundException('Coupon not found');
        return coupon;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.coupon.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.coupon.delete({
            where: { id },
        });
    }
    async findApplicableCoupons(profile_id) {
        const newUser = (await this.prisma.order.count({
            where: { customerProfileId: profile_id },
        })) === 0;
        const now = new Date();
        const coupons = await this.prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' },
        });
        const applicableCoupons = [];
        for (const coupon of coupons) {
            const validFrom = new Date(coupon.validFrom);
            const validTill = new Date(coupon.ValidTill);
            if (validFrom > now || validTill < now)
                continue;
            const usageCount = await this.prisma.couponUsage.count({
                where: {
                    customerProfileId: profile_id,
                    couponId: coupon.id,
                },
            });
            if (usageCount < coupon.usageLimitPerPerson) {
                applicableCoupons.push({
                    ...coupon,
                    remaining_uses: coupon.usageLimitPerPerson - usageCount,
                    isNewUserOnly: coupon.couponName.toLowerCase().includes('first'),
                    isActive: true,
                });
            }
        }
        return applicableCoupons;
    }
    async applyCoupon(profile_id, coupon_id, orderAmount) {
        const now = new Date();
        const coupon = await this.prisma.coupon.findUnique({
            where: { id: coupon_id },
        });
        if (!coupon) {
            throw new Error('Invalid coupon');
        }
        const validFrom = new Date(coupon.validFrom);
        const validTill = new Date(coupon.ValidTill);
        if (validFrom > now || validTill < now) {
            throw new Error('This coupon is not active');
        }
        const usageCount = await this.prisma.couponUsage.count({
            where: {
                customerProfileId: profile_id,
                couponId: coupon.id,
            },
        });
        if (usageCount >= coupon.usageLimitPerPerson) {
            throw new Error('You have reached the maximum usage limit for this coupon');
        }
        if (orderAmount && orderAmount < Number(coupon.minimumSpent)) {
            throw new Error(`This coupon requires a minimum purchase of ${coupon.minimumSpent}`);
        }
        await this.prisma.couponUsage.create({
            data: {
                customerProfileId: profile_id,
                couponId: coupon.id,
            },
        });
        let discount = 0;
        if (coupon.ValueType === 'amount') {
            discount = Number(coupon.Value);
        }
        else if (coupon.ValueType === 'percentage') {
            if (!orderAmount) {
                throw new Error('Order amount required for percentage coupons');
            }
            discount = (orderAmount * Number(coupon.Value)) / 100;
        }
        return {
            message: 'Coupon applied successfully',
            discount,
            status: common_2.HttpStatus.OK,
        };
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CouponService);
//# sourceMappingURL=coupouns.service.js.map