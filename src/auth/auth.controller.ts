// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Patch,
  Request,
  UseInterceptors,
  UploadedFile,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto, LoginDto } from './dto/login.dto';
import { OtpVerifyDto } from './dto/otp-verify.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('send-otp')
  async sendOtp(@Body() loginDto: LoginDto) {
    return this.authService.sendOtp(loginDto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() otpVerifyDto: OtpVerifyDto) {
    return this.authService.verifyOtp(otpVerifyDto.email, otpVerifyDto.otp);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getAdminProfile(@Request() req) {
    const userId = req.user.id;
    const role = req.user.role;
    console.log(role);
    return this.authService.getAdminProfile(userId, role);
  }

  // 🔹 Customer profile
  @Get('customer/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'ADMIN')
  async getCustomerProfile(@Request() req) {
    const userId = req.user.id;
    const role = req.user.role;
    return this.authService.getCustomerProfile(userId, role);
  }


  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  @Post('admin/register')
  async register(@Body() dto: AdminLoginDto) {
    return this.authService.register(dto);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  @Post('admin/login')
  async AdminLogin(@Body() dto: AdminLoginDto) {
    return this.authService.Adminlogin(dto);
  }

  @Get('admin/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async profile(@Request() req) {
    return this.authService.getAdminProfile(req.user.id, req.user.role);
  }



}
