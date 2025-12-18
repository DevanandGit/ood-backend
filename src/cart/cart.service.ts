import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }

  async addToCart(
    userId: string,
    addToCartDto: AddToCartDto,
  ) {
    const { quantity, sizeId } = addToCartDto;

    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }

    return this.prisma.$transaction(async (tx) => {
      /* 1. Validate product */
      const product = await tx.product.findFirst({
        where: {
          id: addToCartDto.productId,
          isActive: true,
          isStock: true,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found or inactive');
      }

      /* 2. Validate customer */
      const customerProfile = await tx.customerProfile.findUnique({
        where: { userId },
      });

      if (!customerProfile) {
        throw new NotFoundException('Customer profile not found');
      }

      /* 3. Validate size & stock */
      const size = await tx.sizeAndQuantity.findFirst({
        where: {
          id: sizeId,
          productId: addToCartDto.productId,
        },
      });

      if (!size) {
        throw new NotFoundException('Invalid size for this product');
      }

      if (size.quantity < quantity) {
        throw new BadRequestException('Insufficient stock for selected size');
      }

      /* 4. Check existing cart item (same product + size) */
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
      } else {
        cartItem = await tx.cartItem.create({
          data: {
            productId: addToCartDto.productId,
            sizeId,
            quantity,
            customerProfileId: customerProfile.id,
          },
        });
      }

      /* 5. Decrement size stock */
      await tx.sizeAndQuantity.update({
        where: { id: sizeId },
        data: {
          quantity: { decrement: quantity },
        },
      });

      /* 6. Optionally update total product stock */
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

  async getCart(userId: string) {
    const customerProfile = await this.prisma.customerProfile.findUnique({
      where: { userId },
    });
    if (!customerProfile)
      throw new NotFoundException('Customer profile not found');

    return this.prisma.cartItem.findMany({
      where: { customerProfileId: customerProfile.id },
      include: { product: { include: { images: true } } },
    });
  }

  async updateCartItem(
    userId: string,
    cartItemId: string,
    updateCartDto: UpdateCartDto,
  ) {
    const customerProfile = await this.prisma.customerProfile.findUnique({
      where: { userId },
    });
    if (!customerProfile)
      throw new NotFoundException('Customer profile not found');

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });
    if (!cartItem || cartItem.customerProfileId !== customerProfile.id) {
      throw new NotFoundException('Cart item not found');
    }

    if (updateCartDto.quantity && updateCartDto.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }

    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { ...updateCartDto },
    });
  }

  async deletecart(userId: string, cartItemId: string) {
    const customerProfile = await this.prisma.customerProfile.findUnique({
      where: { userId },
    });
    if (!customerProfile)
      throw new NotFoundException('Customer profile not found');

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });
    if (!cartItem || cartItem.customerProfileId !== customerProfile.id) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({ where: { id: cartItemId } });
    return { message: 'Item removed from cart successfully' };
  }

  async removeFromCart(
    userId: string,
    cartItemId: string,
    updateCartDto: UpdateCartDto,
  ) {
    const customerProfile = await this.prisma.customerProfile.findUnique({
      where: { userId },
    });
    if (!customerProfile)
      throw new NotFoundException('Customer profile not found');

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });
    if (!cartItem || cartItem.customerProfileId !== customerProfile.id) {
      throw new NotFoundException('Cart item not found');
    }

    const reduceBy = updateCartDto.quantity ?? 1; // default reduce by 1

    const newQuantity = cartItem.quantity - reduceBy;

    // If quantity <= 0 → delete item
    if (newQuantity <= 0) {
      await this.prisma.cartItem.delete({
        where: { id: cartItemId },
      });

      return { message: 'Item removed from cart' };
    }

    // Otherwise update quantity
    await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });

    return { message: 'Cart updated', quantity: newQuantity };
  }

}
