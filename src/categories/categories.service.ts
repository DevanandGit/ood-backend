// src/category/category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateCategoryDto, imagePath?: string) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
        description: dto.description,
        parentId: dto.parentId,
        isActive: dto.isActive ?? true,
        image: imagePath,
      },
    });
  }

  // category.service.ts
  async findAll(query: CategoryQueryDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    // 🔎 Search by category name
    if (query.search) {
      where.name = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    // 🗂 Filter by parent category
    if (query.parentId) {
      where.parentId = query.parentId;
    }

    const [categories, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        skip,
        take: limit,
        where,
        include: {
          children: true,
          parent: true,
        },
        orderBy: { createdAt: 'desc' }, // optional, if you have createdAt
      }),
      this.prisma.category.count({ where }),
    ]);

    return {
      data: categories,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }


  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
      },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto, imagePath?: string) {
    const existing = await this.findOne(id);
    return this.prisma.category.update({
      where: { id },
      data: {
        ...dto,
        image: imagePath ?? existing.image,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.category.delete({ where: { id } });
  }
}
