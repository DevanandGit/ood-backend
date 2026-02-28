import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';

@Injectable()
export class BannersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateBannerDto, mediaPath?: string) {
        return this.prisma.banner.create({
            data: {
                ...dto,
                mediaUrl: mediaPath || dto.mediaUrl || '',
            },
        });
    }

    async findAll(activeOnly: boolean = false) {
        return this.prisma.banner.findMany({
            where: activeOnly ? { isActive: true } : {},
            orderBy: { sortOrder: 'asc' },
        });
    }

    async findOne(id: string) {
        const banner = await this.prisma.banner.findUnique({ where: { id } });
        if (!banner) throw new NotFoundException('Banner not found');
        return banner;
    }

    async update(id: string, dto: UpdateBannerDto, mediaPath?: string) {
        await this.findOne(id);
        return this.prisma.banner.update({
            where: { id },
            data: {
                ...dto,
                ...(mediaPath ? { mediaUrl: mediaPath } : {}),
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.prisma.banner.delete({ where: { id } });
        return { message: 'Banner deleted successfully' };
    }

    async reorder(ids: string[]) {
        const updates = ids.map((id, index) =>
            this.prisma.banner.update({
                where: { id },
                data: { sortOrder: index },
            }),
        );
        await this.prisma.$transaction(updates);
        return { message: 'Banners reordered successfully' };
    }
}
