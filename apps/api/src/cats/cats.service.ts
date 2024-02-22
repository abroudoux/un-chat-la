import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { Cat } from '@/cats/models/cat.model';
import { UpdateCatDto } from '@/cats/dto/update-cat.dto';
import { CreateCatDto } from './dto/create-cat.dto';


@Injectable()
export class CatsService {

    constructor(@InjectModel('Cat') private readonly catModel : Model<Cat>) {}

    async getCats() : Promise<Cat[]> {
        return await this.catModel.find();
    };

    async getCat(id : string) : Promise<Cat> {
        console.log("getCat");
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('Enter a valid id');
        };

        const cat = await this.catModel.findById({ _id : id });

        if (!cat) {
            throw new NotFoundException('Cat not found');
        };

        return cat;
    };

    async createCat(cat : CreateCatDto) : Promise<Cat> {

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
                    const newCat = cat as Cat;
                    newCat.image = firstImageData.url;
                    const savedCat = (await new this.catModel(newCat)).save();
                    return savedCat;
                } else {
                    console.error('Invalid response format from cat image API:', firstImageData);
                    throw new BadRequestException('Failed to create cat');
                };

            } else {
                console.error('Empty or non-array response from cat image API:', catImageDataArray);
                throw new BadRequestException('Failed to create cat');
            };

        } else {
            console.error('Failed to fetch cat image from API. Status:', imageResponse.status);
            throw new BadRequestException('Failed to create cat');
        };

    };

    async deleteCat(id : string) : Promise<Cat | null> {
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('Enter a valid id');
        };

        const catDeleted = await this.catModel.findByIdAndDelete({ _id: id });

        if (!catDeleted) {
            throw new NotFoundException('Cat not found');
        };

        return catDeleted as unknown as Cat;
    };

    async updateCat(id : string, cat : Cat) : Promise<Cat> {
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('Enter a valid id');
        };

        const catUpdated = await this.catModel.findByIdAndUpdate(id, cat, { new: true });

        if (!catUpdated) {
            throw new NotFoundException('Cat not found');
        };

        return catUpdated;
    };

};
