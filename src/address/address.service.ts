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
      where: { CustomerProfile: { userId: profile_id } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const user = await this.prisma.customerProfile.findUnique({
      where: { userId: userId }
    })
    if (!user) {
      throw new NotFoundException("user not found")
    }
    const address = await this.prisma.address.findFirst({
      where: { customerProfileId: user.id }
    });

    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
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
