import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthInput } from './DTOs/IAuthInput';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: IAuthInput) {
        return await this.authService.validateUserCredentials(body);
    }
}
