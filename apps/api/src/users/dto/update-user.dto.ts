import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

import { CreateUserDto } from '@/users/dto/create-user.dto';


export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsString()
    readonly name : string;

    @IsOptional()
    @IsString()
    readonly email : string;

    @IsOptional()
    @IsString()
    readonly password : string;
};