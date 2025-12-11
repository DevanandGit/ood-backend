import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAddressDto: CreateAddressDto, profile_id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        customerProfileId: string;
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        isDefault: boolean;
    }>;
    findAll(profile_id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        customerProfileId: string;
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        isDefault: boolean;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        customerProfileId: string;
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        isDefault: boolean;
    }>;
    update(profile_id: string, id: string, dto: UpdateAddressDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        customerProfileId: string;
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        isDefault: boolean;
    }>;
    remove(profile_id: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        customerProfileId: string;
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        isDefault: boolean;
    }>;
}
