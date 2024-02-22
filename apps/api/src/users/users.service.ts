import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { User } from '@/users/models/user.model';


@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel : Model<User>) {}

    async getUsers(name : string) : Promise<User[]> {
        return await this.userModel.find();
    };

    async getUser(id : string) : Promise<User> {
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('Enter a valid id');
        };

        const user = await this.userModel.findById({ _id : id });

        if (!user) {
            throw new NotFoundException('User not found');
        };

        return user;
    };

    async createUser(user : User) : Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    };

    async deleteUser(id : string) : Promise<User | null> {
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('Enter a valid id');
        };

        const userDeleted = await this.userModel.findByIdAndDelete({ _id: id });

        if (!userDeleted) {
            throw new NotFoundException('User not found');
        };

        return userDeleted as unknown as User;
    };

    async deleteAllUsers() : Promise<void> {
        await this.userModel.deleteMany({});
    };

    async updateUser(id : string, user : User) : Promise<User> {
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('Enter a valid id');
        };

        const userUpdated = await this.userModel.findByIdAndUpdate(id, user, { new: true });

        if (!userUpdated) {
            throw new NotFoundException('User not found');
        };

        return userUpdated;
    };

};
