import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart-item.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    addToCart(userId: string, addToCartDto: AddToCartDto): Promise<{
        message: string;
        cartItem: any;
    }>;
    getCart(userId: string): Promise<({
        product: {
            images: {
                id: string;
                productId: string;
                url: string;
                altText: string | null;
                isMain: boolean;
                sortOrder: number;
            }[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            description: string | null;
            stockCount: number;
            isStock: boolean;
            isActive: boolean;
            categoryId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string | null;
        productId: string;
        quantity: number;
    })[]>;
    updateCartItem(userId: string, cartItemId: string, updateCartDto: UpdateCartDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string | null;
        productId: string;
        quantity: number;
    }>;
    removeFromCart(userId: string, cartItemId: string): Promise<{
        message: string;
    }>;
}
