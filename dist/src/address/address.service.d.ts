import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAddressDto: CreateAddressDto, profile_id: string): Promise<{
        address: string;
        id: string;
        customerProfileId: string;
        name: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        isDefault: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(profile_id: string): Promise<{
        address: string;
        id: string;
        customerProfileId: string;
        name: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        isDefault: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        address: string;
        id: string;
        customerProfileId: string;
        name: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        isDefault: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(profile_id: string, id: string, dto: UpdateAddressDto): Promise<{
        address: string;
        id: string;
        customerProfileId: string;
        name: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        isDefault: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(profile_id: string, id: string): Promise<{
        address: string;
        id: string;
        customerProfileId: string;
        name: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        isDefault: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
