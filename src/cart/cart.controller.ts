import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    const profile_id = req.user.id; // Assuming JWT auth stores user in req.user
    return this.cartService.addToCart(profile_id, addToCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCart(@Request() req) {
    const profile_id = req.user.id;
    return this.cartService.getCart(profile_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCart(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    const profile_id = req.user.id;
    return this.cartService.updateCartItem(profile_id, id, updateCartDto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('remove/:id')
  async removeCart(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    const profile_id = req.user.id;
    return this.cartService.removeFromCart(profile_id, id, updateCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletecart(@Request() req, @Param('id') id: string) {
    const profile_id = req.user.id;
    return this.cartService.deletecart(profile_id, id);
  }
}
