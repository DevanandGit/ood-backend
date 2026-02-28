"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const client_1 = require("@prisma/client");
const utils_1 = require("../common/utility/utils");
const mailer_1 = require("@nestjs-modules/mailer");
const bcrypt = __importStar(require("bcryptjs"));
let AuthService = class AuthService {
    constructor(prisma, usersService, jwtService, mailerService) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async sendOtp(loginDto) {
        const otp = (0, utils_1.generate6DigitOtp)();
        let user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
        if (!user) {
            await this.prisma.user.create({
                data: {
                    email: loginDto.email,
                    otp: otp,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                    role: client_1.Role.CUSTOMER,
                    is_verified: false,
                    CustomerProfile: { create: {} }
                }
            });
        }
        else {
            user = await this.prisma.user.update({
                where: { email: loginDto.email },
                data: {
                    otp: otp,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                }
            });
        }
        await this.mailerService.sendMail({
            to: loginDto.email,
            subject: 'Login OTP',
            template: 'authentication',
            context: {
                otp,
            },
        });
        return { message: 'OTP sent successfully', data: otp };
    }
    async verifyOtp(email, otp) {
        let user = await this.prisma.user.findUnique({ where: { email } });
        console.log(user);
        console.log(otp);
        console.log(user.otp);
        if (user.otp == otp && user.expiresAt > new Date()) {
            if (!user.is_verified) {
                user = await this.prisma.user.update({
                    where: { email },
                    data: { is_verified: true },
                });
                return {
                    user,
                    accessToken: this.jwtService.sign({ sub: user.id, email: user.email }),
                    message: 'User registered successfully',
                    status: 201,
                };
            }
            else {
                return {
                    user,
                    accessToken: this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }),
                    message: 'User registered successfully',
                    status: 201,
                };
            }
        }
        else {
            throw new common_1.UnauthorizedException('Invalid OTP or OTP has expired');
        }
    }
    ;
    async getAdminProfile(id, role) {
        if (role !== client_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('Profile cannot be accessed');
        }
        return this.usersService.AdminProfile(id);
    }
    async getCustomerProfile(id, role) {
        if (role != client_1.Role.CUSTOMER) {
            throw new common_1.ForbiddenException('Profile cannot be accessed');
        }
        return this.usersService.CustomerProfile(id);
    }
    async register(dto) {
        const { email, password } = dto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                role: client_1.Role.ADMIN,
                AdminProfile: { create: {} }
            }
        });
        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            message: 'User registered successfully',
            data: {
                access_token: token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            },
            status: common_1.HttpStatus.CREATED,
        };
    }
    async Adminlogin(dto) {
        const { email, password } = dto;
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { AdminProfile: true },
        });
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            message: 'Login successful',
            data: {
                access_token: token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            },
            status: common_1.HttpStatus.OK,
        };
    }
    async getProfile(id, role) {
        if (role !== client_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return this.prisma.adminProfile.findUnique({ where: { userId: id } });
    }
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                role: true,
                is_verified: true,
                createdAt: true,
                CustomerProfile: {
                    select: {
                        id: true,
                        addresses: true,
                    },
                },
            },
        });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return { user };
    }
    async updatePassword(userId, currentPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        if (user.password) {
            const isValid = await bcrypt.compare(currentPassword, user.password);
            if (!isValid)
                throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        return { message: 'Password updated successfully' };
    }
    async updateCustomerProfile(userId, data) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const updateData = {};
        if (data.email)
            updateData.email = data.email;
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        return { user: updated, message: 'Profile updated successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map