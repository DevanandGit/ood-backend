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
        const { productId, quantity } = addToCartDto;
        const product = await this.prisma.product.findFirst({
            where: { id: productId, isStock: true },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found or inactive');
        }
        if (product.stockCount < quantity) {
            throw new common_1.BadRequestException('Insufficient stock available');
        }
        const customerProfile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!customerProfile) {
            throw new common_1.NotFoundException('Customer profile not found');
        }
        const existingCartItem = await this.prisma.cartItem.findUnique({
            where: {
                customerProfileId_productId: {
                    customerProfileId: customerProfile.id,
                    productId: productId,
                },
            },
        });
        let cartItem;
        if (existingCartItem) {
            cartItem = await this.prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + quantity },
            });
        }
        else {
            cartItem = await this.prisma.cartItem.create({
                data: {
                    productId,
                    quantity,
                    customerProfileId: customerProfile.id,
                },
            });
        }
        await this.prisma.product.update({
            where: { id: productId },
            data: { stockCount: { decrement: quantity } },
        });
        return {
            message: 'Product added to cart successfully',
            cartItem,
        };
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
    async removeFromCart(userId, cartItemId) {
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
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map