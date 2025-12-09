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
exports.WishlistController = void 0;
const common_1 = require("@nestjs/common");
const wishlist_service_1 = require("./wishlist.service");
const wishlist_dto_1 = require("./dto/wishlist.dto");
const pagination_dto_1 = require("../pagination/dto/pagination.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let WishlistController = class WishlistController {
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }
    addToWishlist(dto, req) {
        const profile_id = req.user.id;
        return this.wishlistService.addToWishlist(dto, profile_id);
    }
    getWishlist(req, pagination) {
        const profile_id = req.user.id;
        return this.wishlistService.getWishlist(profile_id, pagination);
    }
    clearWishlist(req) {
        const profile_id = req.user.id;
        return this.wishlistService.clearWishlist(profile_id);
    }
    removeFromWishlist(id, req) {
        const profile_id = req.user.id;
        return this.wishlistService.removeFromWishlist(id, profile_id);
    }
};
exports.WishlistController = WishlistController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wishlist_dto_1.CreateWishlistDto, Object]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "addToWishlist", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "getWishlist", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('all/clear'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "clearWishlist", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "removeFromWishlist", null);
exports.WishlistController = WishlistController = __decorate([
    (0, common_1.Controller)('wishlist'),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService])
], WishlistController);
//# sourceMappingURL=wishlist.controller.js.map