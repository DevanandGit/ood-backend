import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    addToWishlist(dto: CreateWishlistDto, req: any): Promise<{
        product: {
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
        customerProfileId: string;
    }>;
    getWishlist(req: any, pagination: PaginationDto): Promise<import("../pagination/pagination-response.dto").PaginationResponseDto<{
        product: {
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
        customerProfileId: string;
    }>>;
    clearWishlist(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    removeFromWishlist(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        customerProfileId: string;
    }>;
}
