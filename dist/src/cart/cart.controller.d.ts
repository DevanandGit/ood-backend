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
                url: string;
                altText: string | null;
                isMain: boolean;
                sortOrder: number;
                productId: string;
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
            stockCount: number;
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
    })[]>;
    updateCart(req: any, id: string, updateCartDto: UpdateCartDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        customerProfileId: string | null;
        quantity: number;
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
