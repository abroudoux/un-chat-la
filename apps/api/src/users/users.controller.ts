import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { UsersService } from '@/users/users.service';
import { User } from '@/users/models/user.model';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService : UsersService) {};

    // GET /users?name= -> []
    @Get()
    async getUsers(@Query('name') name : string) : Promise<User[]> {
        return await this.usersService.getUsers(name);
    };

    // GET /users/:id -> { ... }
    @Get(':id')
    getUser(@Param('id') id : string) : Promise<User> {
        return this.usersService.getUser(id);
    };

    // POST /users
    @Post()
    createUser(@Body() createUserDto : CreateUserDto) : Promise<User> {
        return this.usersService.createUser(createUserDto);
    };

    // DELETE /users/:id
    @Delete(':id')
    deleteUser(@Param('id') id : string) : Promise<User> {
        return this.usersService.deleteUser(id);
    };

    // DELETE /users/
    @Delete()
    deleteAllUsers() : Promise<void> {
        return this.usersService.deleteAllUsers();
    };

    // PUT /users/:id
    @Put(':id')
    updateUser(@Body() updateUserDto : UpdateUserDto, @Param('id') id : string) : Promise<User> {
        return this.usersService.updateUser(id, updateUserDto);
    };

};
