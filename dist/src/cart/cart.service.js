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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addToCart(userId, addToCartDto) {
        const { quantity, sizeId } = addToCartDto;
        if (quantity <= 0) {
            throw new common_1.BadRequestException('Quantity must be greater than zero');
        }
        return this.prisma.$transaction(async (tx) => {
            const product = await tx.product.findFirst({
                where: {
                    id: addToCartDto.productId,
                    isActive: true,
                    isStock: true,
                },
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found or inactive');
            }
            const customerProfile = await tx.customerProfile.findUnique({
                where: { userId },
            });
            if (!customerProfile) {
                throw new common_1.NotFoundException('Customer profile not found');
            }
            const size = await tx.sizeAndQuantity.findFirst({
                where: {
                    id: sizeId,
                    productId: addToCartDto.productId,
                },
            });
            if (!size) {
                throw new common_1.NotFoundException('Invalid size for this product');
            }
            if (size.quantity < quantity) {
                throw new common_1.BadRequestException('Insufficient stock for selected size');
            }
            const existingCartItem = await tx.cartItem.findFirst({
                where: {
                    customerProfileId: customerProfile.id,
                    productId: addToCartDto.productId,
                    sizeId,
                },
            });
            let cartItem;
            if (existingCartItem) {
                cartItem = await tx.cartItem.update({
                    where: { id: existingCartItem.id },
                    data: {
                        quantity: existingCartItem.quantity + quantity,
                    },
                });
            }
            else {
                cartItem = await tx.cartItem.create({
                    data: {
                        productId: addToCartDto.productId,
                        sizeId,
                        quantity,
                        customerProfileId: customerProfile.id,
                    },
                });
            }
            await tx.sizeAndQuantity.update({
                where: { id: sizeId },
                data: {
                    quantity: { decrement: quantity },
                },
            });
            await tx.product.update({
                where: { id: addToCartDto.productId, },
                data: {
                    totalstockCount: { decrement: quantity },
                },
            });
            return {
                message: 'Product added to cart successfully',
                cartItem,
            };
        });
    }
    async getCart(userId) {
        const customerProfile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!customerProfile)
            throw new common_1.NotFoundException('Customer profile not found');
        return this.prisma.cartItem.findMany({
            where: { customerProfileId: customerProfile.id },
            include: { product: { include: { images: true } } },
        });
    }
    async updateCartItem(userId, cartItemId, updateCartDto) {
        const customerProfile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!customerProfile)
            throw new common_1.NotFoundException('Customer profile not found');
        const cartItem = await this.prisma.cartItem.findUnique({
            where: { id: cartItemId },
        });
        if (!cartItem || cartItem.customerProfileId !== customerProfile.id) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        if (updateCartDto.quantity && updateCartDto.quantity <= 0) {
            throw new common_1.BadRequestException('Quantity must be greater than zero');
        }
        return this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { ...updateCartDto },
        });
    }
    async deletecart(userId, cartItemId) {
        const customerProfile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!customerProfile)
            throw new common_1.NotFoundException('Customer profile not found');
        const cartItem = await this.prisma.cartItem.findUnique({
            where: { id: cartItemId },
        });
        if (!cartItem || cartItem.customerProfileId !== customerProfile.id) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        await this.prisma.cartItem.delete({ where: { id: cartItemId } });
        return { message: 'Item removed from cart successfully' };
    }
    async removeFromCart(userId, cartItemId, updateCartDto) {
        const customerProfile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!customerProfile)
            throw new common_1.NotFoundException('Customer profile not found');
        const cartItem = await this.prisma.cartItem.findUnique({
            where: { id: cartItemId },
        });
        if (!cartItem || cartItem.customerProfileId !== customerProfile.id) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        const reduceBy = updateCartDto.quantity ?? 1;
        const newQuantity = cartItem.quantity - reduceBy;
        if (newQuantity <= 0) {
            await this.prisma.cartItem.delete({
                where: { id: cartItemId },
            });
            return { message: 'Item removed from cart' };
        }
        await this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity: newQuantity },
        });
        return { message: 'Cart updated', quantity: newQuantity };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map