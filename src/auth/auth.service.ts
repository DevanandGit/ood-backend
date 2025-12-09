import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { Role } from '@prisma/client';
import { generate6DigitOtp } from 'src/common/utility/utils';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginDto } from './dto/login.dto';

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
    // await this.mailerService.sendMail({
    //   to: loginDto.email,
    //   subject: 'Login OTP',
    //   template: 'authentication', // ✅ refers to authentication.pug
    //   context: {
    //     otp, // ✅ available inside the template
    //   },
    // });
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
    if (role === Role.CUSTOMER) {
      throw new ForbiddenException('Profile cannot be accessed');
    }
    return this.usersService.CustomerProfile(id);
  }



  /** REGISTER ADMIN */
  async register(dto: LoginDto) {
    const otp = generate6DigitOtp();
    let user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          otp: otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
          role: Role.ADMIN,
          is_verified: false,
          AdminProfile: { create: {} }
        }
      });
    }
    else {
      user = await this.prisma.user.update({
        where: { email: dto.email },
        data: {
          otp: otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
        }
      });
    }
    // await this.mailerService.sendMail({
    //   to: loginDto.email,
    //   subject: 'Login OTP',
    //   template: 'authentication', // ✅ refers to authentication.pug
    //   context: {
    //     otp, // ✅ available inside the template
    //   },
    // });
    return { message: 'OTP sent successfully', data: otp };
  }


  /** PROFILE */
  async getProfile(id: string, role: string) {
    if (role !== Role.ADMIN) {
      throw new ForbiddenException('Access denied');
    }
    return this.prisma.adminProfile.findUnique({ where: { userId: id } });
  }
}
