import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/ product-query.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProductDto, imagePaths: string[]): Promise<{
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
    }>;
    findAll(query: ProductQueryDto): Promise<{
        data: ({
            category: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                isActive: boolean;
                image: string | null;
                parentId: string | null;
            };
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
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            isActive: boolean;
            image: string | null;
            parentId: string | null;
        };
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
    }>;
    update(id: string, dto: UpdateProductDto, imagePaths?: string[]): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
