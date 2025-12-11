import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(createAddressDto: CreateAddressDto, req: any): Promise<{
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
    findAll(req: any): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, dto: UpdateAddressDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
