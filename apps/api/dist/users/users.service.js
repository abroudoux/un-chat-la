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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUsers(name) {
        return await this.userModel.find();
    }
    ;
    async getUser(id) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Enter a valid id');
        }
        ;
        const user = await this.userModel.findById({ _id: id });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        ;
        return user;
    }
    ;
    async createUser(user) {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }
    ;
    async deleteUser(id) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Enter a valid id');
        }
        ;
        const userDeleted = await this.userModel.findByIdAndDelete({ _id: id });
        if (!userDeleted) {
            throw new common_1.NotFoundException('User not found');
        }
        ;
        return userDeleted;
    }
    ;
    async deleteAllUsers() {
        await this.userModel.deleteMany({});
    }
    ;
    async updateUser(id, user) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Enter a valid id');
        }
        ;
        const userUpdated = await this.userModel.findByIdAndUpdate(id, user, { new: true });
        if (!userUpdated) {
            throw new common_1.NotFoundException('User not found');
        }
        ;
        return userUpdated;
    }
    ;
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
;
//# sourceMappingURL=users.service.js.map