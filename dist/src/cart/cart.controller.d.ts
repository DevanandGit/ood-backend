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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
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
        productId: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string | null;
    })[]>;
    updateCart(req: any, id: string, updateCartDto: UpdateCartDto): Promise<{
        id: string;
        productId: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string | null;
    }>;
    removeCart(req: any, id: string, updateCartDto: UpdateCartDto): Promise<{
        message: string;
        quantity?: undefined;
    } | {
        message: string;
        quantity: number;
    }>;
    deletecart(req: any, id: string): Promise<{
        message: string;
    }>;
}
