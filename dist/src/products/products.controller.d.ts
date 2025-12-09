import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/ product-query.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, files: Express.Multer.File[]): Promise<{
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
        name: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        stockCount: number;
        isStock: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    findAll(query: ProductQueryDto): Promise<{
        data: ({
            category: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                image: string | null;
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
            name: string;
            discountedPrice: import("@prisma/client/runtime/library").Decimal;
            actualPrice: import("@prisma/client/runtime/library").Decimal;
            description: string | null;
            stockCount: number;
            isStock: boolean;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
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
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
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
        name: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        stockCount: number;
        isStock: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    update(id: string, updateProductDto: UpdateProductDto, files: Express.Multer.File[]): Promise<{
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
        name: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        stockCount: number;
        isStock: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        stockCount: number;
        isStock: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
}
