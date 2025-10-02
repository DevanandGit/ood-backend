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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayController = void 0;
const common_1 = require("@nestjs/common");
const razorpay_service_1 = require("./razorpay.service");
const checkout_dto_1 = require("./dto/checkout.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let RazorpayController = class RazorpayController {
    constructor(razorpayService) {
        this.razorpayService = razorpayService;
    }
    async createOrder(req, dto) {
        return this.razorpayService.createOrder(dto, req.user.customerProfileId);
    }
    async verifyPayment(body) {
        return this.razorpayService.verifyPaymentSignature(body.razorpay_order_id, body.razorpay_payment_id, body.razorpay_signature);
    }
};
exports.RazorpayController = RazorpayController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create-order'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, checkout_dto_1.CreatePaymentIntentDto]),
    __metadata("design:returntype", Promise)
], RazorpayController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('verify-payment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RazorpayController.prototype, "verifyPayment", null);
exports.RazorpayController = RazorpayController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [razorpay_service_1.RazorpayService])
], RazorpayController);
//# sourceMappingURL=razorpay.controller.js.map