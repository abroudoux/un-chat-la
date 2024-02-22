import { Model } from 'mongoose';
import { User } from '@/users/models/user.model';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    getUsers(name: string): Promise<User[]>;
    getUser(id: string): Promise<User>;
    createUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<User | null>;
    deleteAllUsers(): Promise<void>;
    updateUser(id: string, user: User): Promise<User>;
}
