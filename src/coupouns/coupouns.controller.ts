import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CouponService } from './coupouns.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) { }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateCouponDto) {
    return this.couponService.create(dto);
  }

  @Get()
  async findAll(
    @Query('onlyValid') onlyValid?: string,
    @Query('onlyExpired') onlyExpired?: string,
    @Query('minSpent') minSpent?: string,
  ) {
    return this.couponService.findAll({
      onlyValid: onlyValid === 'true',
      onlyExpired: onlyExpired === 'true',
      minSpent: minSpent ? Number(minSpent) : undefined,
    });
  }


  // Get one
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCouponDto) {
    return this.couponService.update(id, dto);
  }

  // Delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('applicable/coupouns')
  findApplicableCoupons(@Request() req) {
    const profile_id = req.user.id;
    return this.couponService.findApplicableCoupons(profile_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('apply-coupoun')
  applyCoupon(@Query('coupoun_id') coupoun_id: string, @Request() req) {
    const user_id = req.user.id;
    return this.couponService.applyCoupon(user_id, coupoun_id);
  }
}
