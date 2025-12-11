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
    }>;
    findAll(query: ProductQueryDto): Promise<{
        data: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                image: string | null;
                isActive: boolean;
                parentId: string | null;
            };
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
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            image: string | null;
            isActive: boolean;
            parentId: string | null;
        };
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
    }>;
    update(id: string, dto: UpdateProductDto, imagePaths?: string[]): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
