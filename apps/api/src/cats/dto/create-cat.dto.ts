import { IsNotEmpty, IsString } from 'class-validator';


export class CreateCatDto {

    @IsNotEmpty()
    @IsString()
    readonly name : string;

    @IsNotEmpty()
    @IsString()
    readonly color : string;

};