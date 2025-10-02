import { DynamicModule } from '@nestjs/common';
export interface RazorpayModuleOptions {
    key_id: string;
    key_secret: string;
}
export declare class RazorpayModule {
    static forRoot(options: RazorpayModuleOptions): DynamicModule;
}
