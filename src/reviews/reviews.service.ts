import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateReviewDto, customerProfileId: string) {
        // Check if product exists
        const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
        if (!product) throw new NotFoundException('Product not found');

        // Check for existing review
        const existing = await this.prisma.review.findUnique({
            where: {
                customerProfileId_productId: {
                    customerProfileId,
                    productId: dto.productId,
                },
            },
        });
        if (existing) throw new ConflictException('You have already reviewed this product');

        return this.prisma.review.create({
            data: {
                productId: dto.productId,
                customerProfileId,
                rating: dto.rating,
                comment: dto.comment,
            },
            include: {
                CustomerProfile: {
                    include: { user: { select: { email: true } } },
                },
            },
        });
    }

    async findByProduct(productId: string) {
        const reviews = await this.prisma.review.findMany({
            where: { productId },
            include: {
                CustomerProfile: {
                    include: { user: { select: { email: true } } },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        // Calculate summary
        const total = reviews.length;
        const avgRating = total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach((r) => distribution[r.rating]++);

        return {
            reviews,
            summary: {
                totalReviews: total,
                averageRating: Math.round(avgRating * 10) / 10,
                distribution,
            },
        };
    }

    async findAll() {
        return this.prisma.review.findMany({
            include: {
                product: { select: { id: true, name: true } },
                CustomerProfile: {
                    include: { user: { select: { email: true } } },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async remove(id: string) {
        const review = await this.prisma.review.findUnique({ where: { id } });
        if (!review) throw new NotFoundException('Review not found');
        await this.prisma.review.delete({ where: { id } });
        return { message: 'Review deleted successfully' };
    }
}
