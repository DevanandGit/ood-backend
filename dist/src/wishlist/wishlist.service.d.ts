import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';
export declare class WishlistService {
    private prisma;
    constructor(prisma: PrismaService);
    addToWishlist(dto: CreateWishlistDto, userId: string): Promise<{
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
    getWishlist(userId: string, pagination: PaginationDto): Promise<PaginationResponseDto<{
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
    removeFromWishlist(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string;
        productId: string;
    }>;
    clearWishlist(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
