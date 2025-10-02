import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(req: any, addToCartDto: AddToCartDto): Promise<{
        message: string;
        cartItem: any;
    }>;
    getCart(req: any): Promise<({
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
    updateCart(req: any, id: string, updateCartDto: UpdateCartDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string | null;
        productId: string;
        quantity: number;
    }>;
    removeFromCart(req: any, id: string): Promise<{
        message: string;
    }>;
}
