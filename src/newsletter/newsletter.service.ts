import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsletterService {
    constructor(private readonly prisma: PrismaService) { }

    async subscribe(email: string) {
        const existing = await this.prisma.newsletterSubscriber.findUnique({ where: { email } });
        if (existing) {
            if (existing.isActive) {
                throw new ConflictException('Email already subscribed');
            }
            // Re-activate
            return this.prisma.newsletterSubscriber.update({
                where: { email },
                data: { isActive: true },
            });
        }
        return this.prisma.newsletterSubscriber.create({ data: { email } });
    }

    async unsubscribe(email: string) {
        const existing = await this.prisma.newsletterSubscriber.findUnique({ where: { email } });
        if (!existing) return { message: 'Email not found' };
        await this.prisma.newsletterSubscriber.update({
            where: { email },
            data: { isActive: false },
        });
        return { message: 'Unsubscribed successfully' };
    }

    async findAll() {
        return this.prisma.newsletterSubscriber.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
}
