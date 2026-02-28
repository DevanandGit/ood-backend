import {
    Controller, Get, Post, Patch, Delete, Body, Param, Query,
} from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto/testimonial.dto';

@Controller('testimonials')
export class TestimonialsController {
    constructor(private readonly testimonialsService: TestimonialsService) { }

    @Post()
    create(@Body() dto: CreateTestimonialDto) {
        return this.testimonialsService.create(dto);
    }

    @Get()
    findAll(@Query('active') active?: string) {
        return this.testimonialsService.findAll(active === 'true');
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testimonialsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
        return this.testimonialsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testimonialsService.remove(id);
    }
}
