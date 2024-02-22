import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { UsersService } from '@/users/users.service';
import { User } from '@/users/models/user.model';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(name: string): Promise<User[]>;
    getUser(id: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
    deleteAllUsers(): Promise<void>;
    updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User>;
}
