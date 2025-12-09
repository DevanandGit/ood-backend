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
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAddressDto: CreateAddressDto, @Request() req) {
    const userId = req.user.id

    return this.addressService.create(createAddressDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.addressService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const userId = req.user.id
    return this.addressService.findOne(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateAddressDto,
  ) {
    const userId = req.user.id
    return this.addressService.update(userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.id
    return this.addressService.remove(userId, id);
  }
}
