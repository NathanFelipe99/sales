import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IAuthOutput } from './DTOs/IAuthOutput';
import { IAuthInput } from './DTOs/IAuthInput';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private jwtService: JwtService,
    ) { }
    
    async validateUserCredentials(data: IAuthInput): Promise<any> {
        const user = await this.usersService.findUserCredentials(data);
        return await this.generateToken(user);
    }

    async generateToken(payload: IAuthOutput) {
        return {
            access_token: this.jwtService.sign(
                { username: payload.username },
                {
                    secret: 'a23xyz',
                    expiresIn: '1h',
                },
            ),
        };
    }
}
