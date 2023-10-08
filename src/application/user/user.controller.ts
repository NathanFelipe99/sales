import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput } from 'src/shared/utils/types/user.types';
import { IGetUsersDTO } from 'src/domain/user/DTOs/IGetUsersDTO';
import { AuthGuard } from './../auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post('create')
    async createUser(@Body() data: CreateUserInput) {
        return await this.userService.createUser(data);
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return await this.userService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('filterSearch')
    async filterByParams(@Query() query: IGetUsersDTO) {
        return await this.userService.findByParams(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getByID(@Param('id', ParseUUIDPipe) id: string) {
        return await this.userService.findByID(id);
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateUserInput) {
        return await this.userService.update(id, data);
    }

    @UseGuards(AuthGuard)
    @Patch('inactivate/:id')
    async inactivate(@Param('id', ParseUUIDPipe) id: string) {
        return await this.userService.incativate(id);
    }
}