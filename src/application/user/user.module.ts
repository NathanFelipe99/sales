import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/infra/db/user/typeorm/UserRepository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService]
})
export class UserModule { }