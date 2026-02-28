import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { Role } from '@prisma/client';
import { generate6DigitOtp } from 'src/common/utility/utils';
import { MailerService } from '@nestjs-modules/mailer';
import { AdminLoginDto, LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) { }

  async sendOtp(loginDto: LoginDto) {
    const otp = generate6DigitOtp();
    let user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
    if (!user) {
      await this.prisma.user.create({
        data: {
          email: loginDto.email,
          otp: otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
          role: Role.CUSTOMER,
          is_verified: false,
          CustomerProfile: { create: {} }
        }
      });
    }
    else {
      user = await this.prisma.user.update({
        where: { email: loginDto.email },
        data: {
          otp: otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
        }
      });
    }
    await this.mailerService.sendMail({
      to: loginDto.email,
      subject: 'Login OTP',
      template: 'authentication', // ✅ refers to authentication.pug
      context: {
        otp, // ✅ available inside the template
      },
    });
    return { message: 'OTP sent successfully', data: otp };
  }


  async verifyOtp(email: string, otp: string) {
    let user = await this.prisma.user.findUnique({ where: { email } });
    console.log(user);
    console.log(otp);
    console.log(user.otp)
    if (user.otp == otp && user.expiresAt > new Date()) {
      if (!user.is_verified) {
        user = await this.prisma.user.update({
          where: { email },
          data: { is_verified: true },
        });

        return {
          user,
          accessToken: this.jwtService.sign({ sub: user.id, email: user.email }),
          message: 'User registered successfully',
          status: 201,
        };
      }
      else {
        return {
          user,
          accessToken: this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }),
          message: 'User registered successfully',
          status: 201,
        }
      }
    } else {
      throw new UnauthorizedException('Invalid OTP or OTP has expired');
    }
  };

  async getAdminProfile(id: string, role: string) {
    if (role !== Role.ADMIN) {
      throw new ForbiddenException('Profile cannot be accessed');
    }
    return this.usersService.AdminProfile(id);
  }

  async getCustomerProfile(id: string, role: string) {
    if (role != Role.CUSTOMER) {
      throw new ForbiddenException('Profile cannot be accessed');
    }
    return this.usersService.CustomerProfile(id);
  }


  async register(dto: AdminLoginDto) {
    const { email, password } = dto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        role: Role.ADMIN,
        AdminProfile: { create: {} }
      }
    })

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: 'User registered successfully',
      data: {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      status: HttpStatus.CREATED,
    };
  }

  async Adminlogin(dto: AdminLoginDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { AdminProfile: true },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Login successful',
      data: {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      status: HttpStatus.OK,
    };
  }



  /** PROFILE */
  async getProfile(id: string, role: string) {
    if (role !== Role.ADMIN) {
      throw new ForbiddenException('Access denied');
    }
    return this.prisma.adminProfile.findUnique({ where: { userId: id } });
  }

  /** Get current user (for session restore) */
  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        is_verified: true,
        createdAt: true,
        CustomerProfile: {
          select: {
            id: true,
            addresses: true,
          },
        },
      },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return { user };
  }

  /** Update password */
  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    if (user.password) {
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return { message: 'Password updated successfully' };
  }

  /** Update customer profile */
  async updateCustomerProfile(userId: string, data: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const updateData: any = {};
    if (data.email) updateData.email = data.email;

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    return { user: updated, message: 'Profile updated successfully' };
  }


}
