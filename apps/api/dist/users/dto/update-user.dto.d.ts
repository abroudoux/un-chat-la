import { CreateUserDto } from '@/users/dto/create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}
export {};
