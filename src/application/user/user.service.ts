import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInput, UpdateUserInput, UserOutput } from 'src/shared/utils/types/user.types';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { IUserRepository } from 'src/base/user.repository';
import { ListAllUserUseCase } from './useCases/ListAllUserUseCase';
import { FilterByIDUseCase } from './useCases/FilterByIDUseCase';
import { IGetUsersDTO } from 'src/domain/user/DTOs/IGetUsersDTO';
import { FilterUserByParamsUseCase } from './useCases/FilterUserByParamsUseCase';
import { UpdateUserUseCase } from './useCases/UpdateUserUseCase';
import { InactivateUserUseCase } from './useCases/InactivateUserUseCase';
import { UserRepository } from 'src/infra/db/user/typeorm/UserRepository';
import { IAuthOutput } from './../auth/DTOs/IAuthOutput';
import { FindUserToLoginUseCase } from './useCases/FindUserToLoginUseCase';
import { IAuthInput } from '../auth/DTOs/IAuthInput';

@Injectable()
export class UserService {
    constructor(@Inject(UserRepository) private readonly _userRepository: IUserRepository) {}

    async createUser(data: CreateUserInput): Promise<UserOutput> {
        const createUserUseCase = new CreateUserUseCase(this._userRepository);
        return await createUserUseCase.execute(data);
    }

    async findAll(): Promise<UserOutput[]> {
        const listUserUseCase = new ListAllUserUseCase(this._userRepository);
        return await listUserUseCase.execute();
    }

    async findByID(id: string): Promise<UserOutput> {
        const filterByIDUseCase = new FilterByIDUseCase(this._userRepository);
        return await filterByIDUseCase.execute(id);
    }

    async findByParams(data: IGetUsersDTO): Promise<UserOutput[]> {
        const filterUserByParamsUseCase = new FilterUserByParamsUseCase(this._userRepository);
        return await filterUserByParamsUseCase.execute(data);
    }

    async update(id: string, data: UpdateUserInput): Promise<UserOutput> {
        const updateUserUseCase = new UpdateUserUseCase(this._userRepository);
        return await updateUserUseCase.execute(id, data);
    }

    async incativate(id: string): Promise<void> {
        const inactivateUserUseCase = new InactivateUserUseCase(this._userRepository);
        return await inactivateUserUseCase.execute(id);
    }

    async findUserCredentials(data: IAuthInput): Promise<IAuthOutput> {
        const findUserToLoginUseCase = new FindUserToLoginUseCase(this._userRepository);
        return await findUserToLoginUseCase.execute(data);
    }
}