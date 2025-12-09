"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AddressService = class AddressService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAddressDto, profile_id) {
        const { name, address, city, state, postalCode, country, phone, isDefault } = createAddressDto;
        const profile = await this.prisma.customerProfile.findUnique({
            where: { userId: profile_id },
        });
        if (!profile) {
            throw new common_1.NotFoundException('CustomerProfile Not Found');
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
    async findAll(profile_id) {
        return this.prisma.address.findMany({
            where: { CustomerProfile: { userId: profile_id } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(userId, id) {
        const user = await this.prisma.customerProfile.findUnique({
            where: { userId: userId }
        });
        if (!user) {
            throw new common_1.NotFoundException("user not found");
        }
        const address = await this.prisma.address.findFirst({
            where: { customerProfileId: user.id }
        });
        if (!address) {
            throw new common_1.NotFoundException(`Address with id ${id} not found`);
        }
        return address;
    }
    async update(profile_id, id, dto) {
        await this.findOne(profile_id, id);
        return this.prisma.address.update({
            where: { id },
            data: dto,
        });
    }
    async remove(profile_id, id) {
        await this.findOne(profile_id, id);
        return this.prisma.address.delete({ where: { id } });
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressService);
//# sourceMappingURL=address.service.js.map