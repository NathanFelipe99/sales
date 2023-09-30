import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from 'src/shared/utils/types/user.types';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post("create")
    async createUser(@Body() data: CreateUserInput) {
        return this.userService.createUser(data);
    }

    @Get()
    async getAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    async getByID(@Param("id", ParseUUIDPipe) id: string) {
        return this.userService.findByID(id);
    }
}
