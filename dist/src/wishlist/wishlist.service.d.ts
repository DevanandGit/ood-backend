import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';
export declare class WishlistService {
    private prisma;
    constructor(prisma: PrismaService);
    addToWishlist(dto: CreateWishlistDto, userId: string): Promise<{
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
    getWishlist(userId: string, pagination: PaginationDto): Promise<PaginationResponseDto<{
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
    removeFromWishlist(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        customerProfileId: string;
    }>;
    clearWishlist(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
