import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    addToWishlist(dto: CreateWishlistDto, req: any): Promise<{
        product: {
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
        customerProfileId: string;
        productId: string;
    }>;
    getWishlist(req: any, pagination: PaginationDto): Promise<import("../pagination/pagination-response.dto").PaginationResponseDto<{
        product: {
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
        customerProfileId: string;
        productId: string;
    }>>;
    removeFromWishlist(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string;
        productId: string;
    }>;
    clearWishlist(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
