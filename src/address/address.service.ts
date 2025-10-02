import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) { }

  async create(createAddressDto: CreateAddressDto, profile_id: string) {
    const { name, address, city, state, postalCode, country, phone, isDefault } = createAddressDto;
    const profile = await this.prisma.customerProfile.findUnique({
      where: { userId: profile_id },
    });
    if (!profile) {
      throw new NotFoundException('CustomerProfile Not Found');
    }
    return this.prisma.address.create({
      data: {
        name,
        address,
        city,
        state,
        postalCode,
        country,
        phone,
        isDefault,
        customerProfileId: profile.id,
      },
    });
  }

  async findAll(profile_id: string) {
    return this.prisma.address.findMany({
      where: { customerProfileId: profile_id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(profile_id: string, id: string) {
    const address = await this.prisma.address.findUnique({ where: { id } });

    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }

    if (address.customerProfileId !== profile_id) {
      throw new ForbiddenException(
        'You are not allowed to access this address',
      );
    }

    return address;
  }

  async update(profile_id: string, id: string, dto: UpdateAddressDto) {
    await this.findOne(profile_id, id); // ensure belongs to profile
    return this.prisma.address.update({
      where: { id },
      data: dto,
    });
  }

  async remove(profile_id: string, id: string) {
    await this.findOne(profile_id, id); // ensure belongs to profile
    return this.prisma.address.delete({ where: { id } });
  }
}
