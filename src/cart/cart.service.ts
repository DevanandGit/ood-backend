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

  async addToCart(userId: string, addToCartDto: AddToCartDto) {
    const { productId, quantity } = addToCartDto;
    // 1. Check if product exists & is active
    const product = await this.prisma.product.findFirst({
      where: { id: productId, isStock: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found or inactive');
    }
    if (product.stockCount < quantity) {
      throw new BadRequestException('Insufficient stock available');
    }
    // 2. Get the customer profile from userId
    const customerProfile = await this.prisma.customerProfile.findUnique({
      where: { userId },
    });

    if (!customerProfile) {
      throw new NotFoundException('Customer profile not found');
    }

    // 3. Check if product already exists in cart
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
      // 4. Update quantity
      cartItem = await this.prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      // 5. Create new cart item
      cartItem = await this.prisma.cartItem.create({
        data: {
          productId,
          quantity,
          customerProfileId: customerProfile.id,
        },
      });
    }

    // 6. Update product stock (optional, if you want stock to reduce immediately)
    await this.prisma.product.update({
      where: { id: productId },
      data: { stockCount: { decrement: quantity } },
    });

    return {
      message: 'Product added to cart successfully',
      cartItem,
    };
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
