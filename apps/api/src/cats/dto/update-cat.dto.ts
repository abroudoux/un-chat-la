import  { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

import { CreateCatDto } from '@/cats/dto/create-cat.dto';


export class UpdateCatDto extends PartialType(CreateCatDto) {

    @IsOptional()
    @IsString()
    readonly name : string;

    @IsOptional()
    @IsString()
    readonly color : string;

    @IsOptional()
    @IsString()
    readonly image : string;
};