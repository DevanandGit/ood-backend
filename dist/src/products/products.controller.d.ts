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
            createdAt: Date;
            updatedAt: Date;
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
        description: string | null;
        isActive: boolean;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        totalstockCount: number;
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
                parentId: string | null;
                isActive: boolean;
            };
            images: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                url: string;
                altText: string | null;
                isMain: boolean;
                sortOrder: number;
            }[];
            sizeAndQuantities: {
                quantity: number;
                size: string;
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
            totalstockCount: number;
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
            parentId: string | null;
            isActive: boolean;
        };
        images: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
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
        description: string | null;
        isActive: boolean;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        totalstockCount: number;
        isStock: boolean;
        categoryId: string;
    }>;
    update(id: string, updateProductDto: UpdateProductDto, files: Express.Multer.File[]): Promise<{
        images: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
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
        description: string | null;
        isActive: boolean;
        discountedPrice: import("@prisma/client/runtime/library").Decimal;
        actualPrice: import("@prisma/client/runtime/library").Decimal;
        totalstockCount: number;
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
        totalstockCount: number;
        isStock: boolean;
        categoryId: string;
    }>;
    uploadImages(productId: string, files: Express.Multer.File[], mainIndex?: string, altTexts?: string[] | string): Promise<{
        message: string;
        uploadedCount: number;
    }>;
    updateImage(imageId: string, file?: Express.Multer.File, body?: {
        altText?: string;
        isMain?: string;
        sortOrder?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        url: string;
        altText: string | null;
        isMain: boolean;
        sortOrder: number;
    }>;
    deleteImage(imageId: string): Promise<{
        message: string;
    }>;
}
