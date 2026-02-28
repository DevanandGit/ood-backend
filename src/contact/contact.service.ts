import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateContactDto) {
        return this.prisma.contactMessage.create({ data: dto });
    }

    async findAll() {
        return this.prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const msg = await this.prisma.contactMessage.findUnique({ where: { id } });
        if (!msg) throw new NotFoundException('Message not found');
        return msg;
    }

    async markAsRead(id: string) {
        await this.findOne(id);
        return this.prisma.contactMessage.update({
            where: { id },
            data: { isRead: true },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.prisma.contactMessage.delete({ where: { id } });
        return { message: 'Message deleted successfully' };
    }
}
