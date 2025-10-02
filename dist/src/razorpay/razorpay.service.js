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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayService = void 0;
const common_1 = require("@nestjs/common");
const razorpay_1 = require("razorpay");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto = require("crypto");
let RazorpayService = class RazorpayService {
    constructor(razorpayClient, prisma) {
        this.razorpayClient = razorpayClient;
        this.prisma = prisma;
    }
    async createOrder(dto, customerProfileId) {
        const { productId, quantity, cartId, currency } = dto;
        let amount = 0;
        let orderItemsData = [];
        if (productId) {
            const pdt = await this.prisma.product.findUnique({
                where: { id: productId },
            });
            if (!pdt)
                throw new Error('Product not found');
            if (quantity > pdt.stockCount)
                throw new Error('Insufficient stock');
            amount = Number(pdt.discountedPrice) * quantity;
            orderItemsData.push({
                productId: pdt.id,
                quantity,
                discountedPrice: pdt.discountedPrice,
                actualPrice: pdt.actualPrice,
            });
        }
        else if (cartId) {
            const cartItems = await this.prisma.cartItem.findMany({
                where: { customerProfileId: customerProfileId },
                include: { product: true },
            });
            if (!cartItems || cartItems.length === 0)
                throw new Error('Cart is empty');
            cartItems.forEach((item) => {
                if (!item.product)
                    return;
                amount += Number(item.product.discountedPrice) * (item.quantity ?? 1);
                orderItemsData.push({
                    productId: item.product.id,
                    quantity: item.quantity ?? 1,
                    discountedPrice: item.product.discountedPrice,
                    actualPrice: item.product.actualPrice,
                });
            });
        }
        else {
            throw new Error('Either productId or cartId must be provided');
        }
        const order = await this.prisma.order.create({
            data: {
                orderNumber: `ORD-${Date.now()}`,
                status: 'pending',
                paymentStatus: 'pending',
                totalAmount: amount,
                customerProfileId,
                items: {
                    create: orderItemsData.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        discountedPrice: item.discountedPrice,
                        actualPrice: item.actualPrice,
                    })),
                },
            },
            include: { items: true },
        });
        const options = {
            amount: Math.round(amount * 100),
            currency: 'INR',
            receipt: order.orderNumber,
        };
        try {
            const razorpayOrder = await this.razorpayClient.orders.create(options);
            await this.prisma.order.update({
                where: { id: order.id },
                data: {
                    trackingID: razorpayOrder.id,
                },
            });
            return {
                message: 'Order created successfully',
                order,
                razorpayOrder,
            };
        }
        catch (error) {
            console.error('Error creating Razorpay order:', error);
            await this.prisma.order.delete({ where: { id: order.id } });
            throw error;
        }
    }
    async verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest('hex');
        if (generatedSignature !== razorpaySignature) {
            return { success: false, message: 'Payment verification failed' };
        }
        const existingOrder = await this.prisma.order.findFirst({
            where: {
                trackingID: razorpayOrderId,
            },
        });
        if (!existingOrder) {
            return { success: false, message: 'Order not found for verification' };
        }
        const order = await this.prisma.order.update({
            where: { id: existingOrder.id },
            data: {
                paymentStatus: 'completed',
                status: 'confirmed',
            },
        });
        return { success: true, order };
    }
};
exports.RazorpayService = RazorpayService;
exports.RazorpayService = RazorpayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RAZORPAY_CLIENT')),
    __metadata("design:paramtypes", [razorpay_1.default, prisma_service_1.PrismaService])
], RazorpayService);
//# sourceMappingURL=razorpay.service.js.map