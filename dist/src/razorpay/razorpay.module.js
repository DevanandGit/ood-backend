"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RazorpayModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayModule = void 0;
const common_1 = require("@nestjs/common");
const Razorpay = require('razorpay');
let RazorpayModule = RazorpayModule_1 = class RazorpayModule {
    static forRoot(options) {
        const razorpayProvider = {
            provide: 'RAZORPAY_CLIENT',
            useFactory: () => {
                return new Razorpay({
                    key_id: options.key_id,
                    key_secret: options.key_secret,
                });
            },
        };
        return {
            module: RazorpayModule_1,
            providers: [razorpayProvider],
            exports: [razorpayProvider],
        };
    }
};
exports.RazorpayModule = RazorpayModule;
exports.RazorpayModule = RazorpayModule = RazorpayModule_1 = __decorate([
    (0, common_1.Module)({})
], RazorpayModule);
//# sourceMappingURL=razorpay.module.js.map