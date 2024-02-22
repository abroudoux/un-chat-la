import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { UsersSchema } from '@/users/models/user.model';



@Module({
    imports: [MongooseModule.forFeature([{ name : 'User', schema : UsersSchema }])],
    controllers: [UsersController],
    providers: [UsersService],
})


export class UsersModule {}
