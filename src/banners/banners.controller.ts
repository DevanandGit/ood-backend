import {
    Controller, Get, Post, Patch, Put, Delete, Body, Param, Query,
    UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BannersService } from './banners.service';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';

@Controller('hero-slides')
export class BannersController {
    constructor(private readonly bannersService: BannersService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('media', {
            storage: diskStorage({
                destination: './uploads/banners',
                filename: (req, file, cb) => {
                    const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, randomName + extname(file.originalname));
                },
            }),
        }),
    )
    create(@Body() dto: CreateBannerDto, @UploadedFile() file?: Express.Multer.File) {
        const mediaPath = file ? `/uploads/banners/${file.filename}` : undefined;
        return this.bannersService.create(dto, mediaPath);
    }

    @Get()
    findAll(@Query('active') active?: string) {
        return this.bannersService.findAll(active === 'true');
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bannersService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('media', {
            storage: diskStorage({
                destination: './uploads/banners',
                filename: (req, file, cb) => {
                    const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, randomName + extname(file.originalname));
                },
            }),
        }),
    )
    update(
        @Param('id') id: string,
        @Body() dto: UpdateBannerDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const mediaPath = file ? `/uploads/banners/${file.filename}` : undefined;
        return this.bannersService.update(id, dto, mediaPath);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bannersService.remove(id);
    }

    @Put('reorder')
    reorder(@Body() body: { slideIds: string[] }) {
        return this.bannersService.reorder(body.slideIds);
    }
}
