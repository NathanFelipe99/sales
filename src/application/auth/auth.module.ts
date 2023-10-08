import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserRepository } from 'src/infra/db/user/typeorm/UserRepository';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UserModule,
        JwtModule.register({ global: true, secret: process.env.JWT_SECRET }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, JwtStrategy, UserRepository],
    exports: [AuthService]
})
export class AuthModule { }