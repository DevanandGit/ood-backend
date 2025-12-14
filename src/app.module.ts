// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ResponseModule } from './response/response.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { RazorpayModule } from './razorpay/razorpay.module';
import { CouponModule } from './coupouns/coupouns.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';
import { CategoryModule } from './categories/categories.module';
import { RazorpayService } from './razorpay/razorpay.service';
import { RazorpayController } from './razorpay/razorpay.controller';
import { OrdersModule } from './orders/orders.module';
import { AddressModule } from './address/address.module';
import { NotificationModule } from './notifications/notifications.module';
import { FirebaseModule } from './firebase/firebase.module';
import { DeviceTokenModule } from './token/device-token.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ResponseModule,
    ScheduleModule.forRoot(),
    ProductModule,
    CartModule,
    CategoryModule,
    CouponModule,
    WishlistModule,
    OrdersModule,
    AddressModule,
    NotificationModule,
    AnalyticsModule,
    FirebaseModule,
    DeviceTokenModule,

    RazorpayModule.forRoot({
      key_id: process.env.RAZORPAY_KEY_ID, // Use environment variables for keys
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',       // your SMTP host
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
        dir: join(process.cwd(), 'src/templates'), // ✅ absolute path
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: "/uploads",
      serveStaticOptions: {
        index: false,
      }
    }),
  ],
  providers: [RazorpayService],
  controllers: [RazorpayController],
})
export class AppModule { }
