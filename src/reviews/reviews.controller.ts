import {
    Controller, Post, Get, Delete, Body, Param, UseGuards, Request,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateReviewDto, @Request() req) {
        const profileId = req.user.customerProfile?.id;
        return this.reviewsService.create(dto, profileId);
    }

    @Get('product/:productId')
    findByProduct(@Param('productId') productId: string) {
        return this.reviewsService.findByProduct(productId);
    }

    @Get()
    findAll() {
        return this.reviewsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewsService.remove(id);
    }
}
