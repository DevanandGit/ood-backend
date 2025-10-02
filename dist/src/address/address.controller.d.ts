import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(createAddressDto: CreateAddressDto, req: any): Promise<{
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
    findAll(req: any): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, dto: UpdateAddressDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
