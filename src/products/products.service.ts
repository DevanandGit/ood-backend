// src/product/product.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/ product-query.dto';
import * as fs from 'fs';

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

  async addImages(
    productId: string,
    files: Express.Multer.File[],
    mainIndex?: number,
    altTexts?: string[] | string,
  ) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
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

    // If a new main image is set → unset old main image
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


  async updateImage(
    imageId: string,
    file?: Express.Multer.File,
    body?: {
      altText?: string;
      isMain?: string;
      sortOrder?: string;
    },
  ) {
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException('Product image not found');
    }

    // If setting new main image → unset previous main
    if (body?.isMain === 'true') {
      await this.prisma.productImage.updateMany({
        where: {
          productId: image.productId,
          isMain: true,
        },
        data: { isMain: false },
      });
    }

    // Delete old file if replacing image
    let newUrl: string | undefined;
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


  async deleteImage(imageId: string) {
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException('Product image not found');
    }

    // Prevent deleting main image if it's the only image
    const totalImages = await this.prisma.productImage.count({
      where: { productId: image.productId },
    });

    if (image.isMain && totalImages > 1) {
      throw new BadRequestException(
        'Please set another image as main before deleting this one',
      );
    }

    // Delete file from disk
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




}
