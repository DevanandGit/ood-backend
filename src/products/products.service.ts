// src/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/ product-query.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateProductDto, imagePaths: string[]) {
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
            isMain: idx === 0, // first one is main
          })),
        },
      },
      include: { images: true },
    });
  }

  // product.service.ts
  async findAll(query: ProductQueryDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    // 🔎 Search by name or description
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    // 🗂 Filter by categoryId
    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    // ✅ Filter by active status
    if (query.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    }

    // ✅ Filter by stock status
    if (query.isStock !== undefined) {
      where.isStock = query.isStock === 'true';
    }

    // 📝 Execute the query
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


  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true, category: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, dto: UpdateProductDto, imagePaths?: string[]) {
    const existing = await this.findOne(id);

    // Optionally create new images
    let imageData: any = undefined;
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

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }
}
