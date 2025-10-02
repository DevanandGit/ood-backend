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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const client_1 = require("@prisma/client");
const utils_1 = require("../common/utility/utils");
const mailer_1 = require("@nestjs-modules/mailer");
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
                    role: client_1.Roles.CUSTOMER,
                    is_verified: false,
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
        return { message: 'OTP sent successfully' };
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
                    accessToken: this.jwtService.sign({ sub: user.id, email: user.email }),
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
        if (role !== client_1.Roles.ADMIN) {
            throw new common_1.ForbiddenException('Profile cannot be accessed');
        }
        return this.usersService.AdminProfile(id);
    }
    async getCustomerProfile(id, role) {
        if (role === client_1.Roles.CUSTOMER) {
            throw new common_1.ForbiddenException('Profile cannot be accessed');
        }
        return this.usersService.CustomerProfile(id);
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