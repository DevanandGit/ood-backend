"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const response_module_1 = require("./response/response.module");
const schedule_1 = require("@nestjs/schedule");
const products_module_1 = require("./products/products.module");
const cart_module_1 = require("./cart/cart.module");
const razorpay_module_1 = require("./razorpay/razorpay.module");
const coupouns_module_1 = require("./coupouns/coupouns.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const mailer_1 = require("@nestjs-modules/mailer");
const pug_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/pug.adapter");
const path_1 = require("path");
const categories_module_1 = require("./categories/categories.module");
const razorpay_service_1 = require("./razorpay/razorpay.service");
const razorpay_controller_1 = require("./razorpay/razorpay.controller");
const orders_module_1 = require("./orders/orders.module");
const address_module_1 = require("./address/address.module");
const notifications_module_1 = require("./notifications/notifications.module");
const firebase_module_1 = require("./firebase/firebase.module");
const device_token_module_1 = require("./token/device-token.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            response_module_1.ResponseModule,
            schedule_1.ScheduleModule.forRoot(),
            products_module_1.ProductModule,
            cart_module_1.CartModule,
            categories_module_1.CategoryModule,
            coupouns_module_1.CouponModule,
            wishlist_module_1.WishlistModule,
            orders_module_1.OrdersModule,
            address_module_1.AddressModule,
            notifications_module_1.NotificationModule,
            firebase_module_1.FirebaseModule,
            device_token_module_1.DeviceTokenModule,
            razorpay_module_1.RazorpayModule.forRoot({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS,
                    },
                },
                defaults: {
                    from: '"No Reply" <no-wishyougrowth@gmail.com>',
                },
                template: {
                    dir: (0, path_1.join)(process.cwd(), 'src/templates'),
                    adapter: new pug_adapter_1.PugAdapter(),
                    options: {
                        strict: true,
                    },
                }
            }),
        ],
        providers: [razorpay_service_1.RazorpayService],
        controllers: [razorpay_controller_1.RazorpayController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map