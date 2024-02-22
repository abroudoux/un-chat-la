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
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CatsService = class CatsService {
    catModel;
    constructor(catModel) {
        this.catModel = catModel;
    }
    async getCats() {
        return await this.catModel.find();
    }
    ;
    async getCat(id) {
        console.log("getCat");
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Enter a valid id');
        }
        ;
        const cat = await this.catModel.findById({ _id: id });
        if (!cat) {
            throw new common_1.NotFoundException('Cat not found');
        }
        ;
        return cat;
    }
    ;
    async createCat(cat) {
        const imageResponse = await fetch('https://api.thecatapi.com/v1/images/search', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'live_nqlZTA7eNb7RAu9dJrnRtAGG5Py32CAVv70LZAeel1BcyvOnR90YWmrQbR80dnWL',
            },
        });
        if (imageResponse.ok) {
            const catImageDataArray = await imageResponse.json();
            if (Array.isArray(catImageDataArray) && catImageDataArray.length > 0) {
                const firstImageData = catImageDataArray[0];
                if (firstImageData && typeof firstImageData.url === 'string') {
                    const newCat = cat;
                    newCat.image = firstImageData.url;
                    const savedCat = (await new this.catModel(newCat)).save();
                    return savedCat;
                }
                else {
                    console.error('Invalid response format from cat image API:', firstImageData);
                    throw new common_1.BadRequestException('Failed to create cat');
                }
                ;
            }
            else {
                console.error('Empty or non-array response from cat image API:', catImageDataArray);
                throw new common_1.BadRequestException('Failed to create cat');
            }
            ;
        }
        else {
            console.error('Failed to fetch cat image from API. Status:', imageResponse.status);
            throw new common_1.BadRequestException('Failed to create cat');
        }
        ;
    }
    ;
    async deleteCat(id) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Enter a valid id');
        }
        ;
        const catDeleted = await this.catModel.findByIdAndDelete({ _id: id });
        if (!catDeleted) {
            throw new common_1.NotFoundException('Cat not found');
        }
        ;
        return catDeleted;
    }
    ;
    async updateCat(id, cat) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Enter a valid id');
        }
        ;
        const catUpdated = await this.catModel.findByIdAndUpdate(id, cat, { new: true });
        if (!catUpdated) {
            throw new common_1.NotFoundException('Cat not found');
        }
        ;
        return catUpdated;
    }
    ;
};
exports.CatsService = CatsService;
exports.CatsService = CatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Cat')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CatsService);
;
//# sourceMappingURL=cats.service.js.map