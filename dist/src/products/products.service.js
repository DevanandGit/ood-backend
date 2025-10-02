"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, imagePaths) {
        return this.prisma.product.create({
            data: {
                name: dto.name,
                discountedPrice: dto.discountedPrice,
                actualPrice: dto.actualPrice,
                description: dto.description,
                stockCount: dto.stockCount ?? 0,
                isStock: dto.isStock ?? true,
                isActive: dto.isActive ?? true,
                categoryId: dto.categoryId,
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
        const where = {};
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        if (query.categoryId) {
            where.categoryId = query.categoryId;
        }
        if (query.isActive !== undefined) {
            where.isActive = query.isActive === 'true';
        }
        if (query.isStock !== undefined) {
            where.isStock = query.isStock === 'true';
        }
        const [products, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                skip,
                take: limit,
                where,
                include: {
                    images: true,
                    category: true,
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
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=products.service.js.map