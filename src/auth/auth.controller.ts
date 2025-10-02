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
import { LoginDto } from './dto/login.dto';
import { OtpVerifyDto } from './dto/otp-verify.dto';
import { EmailDto } from './dto/email.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateCustomerProfileDto } from 'src/users/dto/update-customer-profile.dto';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
}
