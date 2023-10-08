import { User } from "src/domain/user/user.entity";
import { IUserRepository } from "src/base/user.repository";
import { CreateUserInput, UserOutput } from "src/shared/utils/types/user.types";
import { hash } from "bcrypt";
import { AppError } from "src/shared/errors/AppError";
import {  Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/infra/db/user/typeorm/UserRepository";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: IUserRepository
    ) {}

    async execute(data: CreateUserInput): Promise<UserOutput> {
        const { username, password, name, email, phone } = data;
        const usernameAlreadyExists = await this._userRepository.findByParams({ username });
        const userEmailAlreadyExists = await this._userRepository.findByParams({ email });

        if (usernameAlreadyExists.length) throw new AppError("Username already in use!", 400);

        if (userEmailAlreadyExists.length) throw new AppError("Email already in use!", 400);

        const hashPassword = await hash(password, 10);
        const user = new User({
            username,
            password: hashPassword,
            name,
            email,
            phone
        });

        await this._userRepository.insert(user);
        return user.toJSON();
    }
}