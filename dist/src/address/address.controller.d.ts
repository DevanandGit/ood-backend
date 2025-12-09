import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(createAddressDto: CreateAddressDto, req: any): Promise<{
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
    findAll(req: any): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, dto: UpdateAddressDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
