"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = __importStar(require("fs"));
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, imagePaths) {
        const sizeEntries = Object.entries(dto.sizeAndQuantity ?? {}).map(([size, quantity]) => ({
            size,
            quantity: Number(quantity) || 0
        }));
        const totalstockCount = sizeEntries.reduce((sum, item) => sum + item.quantity, 0);
        return this.prisma.product.create({
            data: {
                name: dto.name,
                discountedPrice: dto.discountedPrice,
                actualPrice: dto.actualPrice,
                description: dto.description,
                totalstockCount: totalstockCount,
                isStock: dto.isStock ?? true,
                isActive: dto.isActive ?? true,
                categoryId: dto.categoryId,
                sizeAndQuantities: { create: sizeEntries },
                images: {
                    create: imagePaths.map((url, idx) => ({
                        url,
                        sortOrder: idx,
                        isMain: idx === 0,
                    })),
                },
            },
            include: { images: true },
        });
    }
    async findAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const where = {
            isActive: true,
        };
        if (query.search) {
            where.name = {
                contains: query.search,
                mode: 'insensitive',
            };
        }
        if (query.categoryId) {
            where.categoryId = query.categoryId;
        }
        if (query.minPrice || query.maxPrice) {
            where.discountedPrice = {};
            if (query.minPrice) {
                where.discountedPrice.gte = Number(query.minPrice);
            }
            if (query.maxPrice) {
                where.discountedPrice.lte = Number(query.maxPrice);
            }
        }
        if (query.isStock !== undefined) {
            where.isStock = query.isStock === 'true';
        }
        if (query.isActive !== undefined) {
            where.isActive = query.isActive === 'true';
        }
        if (query.size) {
            where.sizeAndQuantities = {
                some: {
                    size: query.size,
                    quantity: {
                        gt: 0,
                    },
                },
            };
        }
        const [products, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                skip,
                take: limit,
                where,
                include: {
                    images: true,
                    category: true,
                    sizeAndQuantities: {
                        select: {
                            size: true,
                            quantity: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data: products,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { images: true, category: true },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async update(id, dto, imagePaths) {
        const existing = await this.findOne(id);
        let imageData = undefined;
        if (imagePaths && imagePaths.length > 0) {
            imageData = {
                create: imagePaths.map((url, idx) => ({
                    url,
                    sortOrder: existing.images.length + idx,
                    isMain: false,
                })),
            };
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                ...dto,
                images: imageData,
            },
            include: { images: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.product.delete({ where: { id } });
    }
    async addImages(productId, files, mainIndex, altTexts) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const altTextArray = Array.isArray(altTexts)
            ? altTexts
            : altTexts
                ? [altTexts]
                : [];
        const imageData = files.map((file, index) => ({
            productId,
            url: `/uploads/products/${file.filename}`,
            altText: altTextArray[index] || null,
            isMain: mainIndex === index,
            sortOrder: index,
        }));
        if (mainIndex !== undefined) {
            await this.prisma.productImage.updateMany({
                where: { productId, isMain: true },
                data: { isMain: false },
            });
        }
        await this.prisma.productImage.createMany({
            data: imageData,
        });
        return {
            message: 'Product images uploaded successfully',
            uploadedCount: files.length,
        };
    }
    async updateImage(imageId, file, body) {
        const image = await this.prisma.productImage.findUnique({
            where: { id: imageId },
        });
        if (!image) {
            throw new common_1.NotFoundException('Product image not found');
        }
        if (body?.isMain === 'true') {
            await this.prisma.productImage.updateMany({
                where: {
                    productId: image.productId,
                    isMain: true,
                },
                data: { isMain: false },
            });
        }
        let newUrl;
        if (file) {
            if (image.url && fs.existsSync(`.${image.url}`)) {
                fs.unlinkSync(`.${image.url}`);
            }
            newUrl = `/uploads/products/${file.filename}`;
        }
        return this.prisma.productImage.update({
            where: { id: imageId },
            data: {
                ...(newUrl && { url: newUrl }),
                ...(body?.altText && { altText: body.altText }),
                ...(body?.isMain !== undefined && {
                    isMain: body.isMain === 'true',
                }),
                ...(body?.sortOrder !== undefined && {
                    sortOrder: Number(body.sortOrder),
                }),
            },
        });
    }
    async deleteImage(imageId) {
        const image = await this.prisma.productImage.findUnique({
            where: { id: imageId },
        });
        if (!image) {
            throw new common_1.NotFoundException('Product image not found');
        }
        const totalImages = await this.prisma.productImage.count({
            where: { productId: image.productId },
        });
        if (image.isMain && totalImages > 1) {
            throw new common_1.BadRequestException('Please set another image as main before deleting this one');
        }
        if (image.url && fs.existsSync(`.${image.url}`)) {
            fs.unlinkSync(`.${image.url}`);
        }
        await this.prisma.productImage.delete({
            where: { id: imageId },
        });
        return {
            message: 'Product image deleted successfully',
        };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=products.service.js.map