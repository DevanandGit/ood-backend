import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAddressDto: CreateAddressDto, profile_id: string): Promise<{
        address: string;
        name: string;
        phone: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string;
        isDefault: boolean;
    }>;
    findAll(profile_id: string): Promise<{
        address: string;
        name: string;
        phone: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string;
        isDefault: boolean;
    }[]>;
    findOne(profile_id: string, id: string): Promise<{
        address: string;
        name: string;
        phone: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string;
        isDefault: boolean;
    }>;
    update(profile_id: string, id: string, dto: UpdateAddressDto): Promise<{
        address: string;
        name: string;
        phone: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string;
        isDefault: boolean;
    }>;
    remove(profile_id: string, id: string): Promise<{
        address: string;
        name: string;
        phone: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerProfileId: string;
        isDefault: boolean;
    }>;
}
