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
    const profile_id = req.user.id

    return this.addressService.create(createAddressDto, profile_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const profile_id = req.user.customerProfile.id;
    return this.addressService.findAll(profile_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const profile_id = req.user.customerProfile.id;
    return this.addressService.findOne(profile_id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateAddressDto,
  ) {
    const profile_id = req.user.customerProfile.id;
    return this.addressService.update(profile_id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const profile_id = req.user.customerProfile.id;
    return this.addressService.remove(profile_id, id);
  }
}
