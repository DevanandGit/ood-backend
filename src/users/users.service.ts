import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Roles } from '@prisma/client';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }


  //admin only
  async findAll(role?: string) {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      where: role ? { role: role as any } : {}, // filter by role if provided
      orderBy: { createdAt: 'desc' },
    });
  }
  async CustomerProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        CustomerProfile: {
          select: {
            addresses: true,
            reviews: true,
            couponUsages: true,
            orders: true,
            cart: true,
            BankDetails: true,
            Wishlist: true
          },
        },
      },
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  //Customer only
  async AdminProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        AdminProfile: {
          select: {
            notes: true,
          },
        },
      },
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  //admin only
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        CustomerProfile: {
          select: {
            addresses: true,
            reviews: true,
            couponUsages: true,
            orders: true,
            cart: true,
            BankDetails: true,
            Wishlist: true
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.CustomerProfile(id); // ensure user exists
    await this.prisma.user.delete({ where: { id } });
    return { message: `User with ID ${id} deleted successfully` };
  }

}
