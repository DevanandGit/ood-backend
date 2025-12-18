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
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                url: string;
                altText: string | null;
                isMain: boolean;
                sortOrder: number;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            totalstockCount: number;
            isStock: boolean;
            categoryId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        customerProfileId: string | null;
        quantity: number;
        sizeId: string;
    })[]>;
    updateCartItem(userId: string, cartItemId: string, updateCartDto: UpdateCartDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        customerProfileId: string | null;
        quantity: number;
        sizeId: string;
    }>;
    deletecart(userId: string, cartItemId: string): Promise<{
        message: string;
    }>;
    removeFromCart(userId: string, cartItemId: string, updateCartDto: UpdateCartDto): Promise<{
        message: string;
        quantity?: undefined;
    } | {
        message: string;
        quantity: number;
    }>;
}
