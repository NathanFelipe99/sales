import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from 'src/shared/utils/types/user.types';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    async createUser(@Body() data: CreateUserInput) {
        return this.userService.createUser(data);
    }
}
