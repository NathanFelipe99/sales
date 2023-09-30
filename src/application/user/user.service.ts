import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInput, UpdateUserInput, UserOutput } from 'src/shared/utils/types/user.types';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { IUserRepository } from 'src/base/user.repository';
import { UserRepositoryInMemory } from 'src/infra/db/user/memory/UserRepositoryInMemory';
import { ListAllUserUseCase } from './useCases/ListAllUserUseCase';
import { FilterByIDUseCase } from './useCases/FilterByIDUseCase';
import { IGetUsersDTO } from 'src/domain/user/DTOs/IGetUsersDTO';
import { FilterUserByParamsUseCase } from './useCases/FilterUserByParamsUseCase';
import { UpdateUserUseCase } from './useCases/UpdateUserUseCase';
import { InactivateUserUseCase } from './useCases/InactivateUserUseCase';

@Injectable()
export class UserService {
    private readonly _userRepository: IUserRepository;
    constructor() {
        this._userRepository = new UserRepositoryInMemory();
    }

    async createUser(data: CreateUserInput): Promise<UserOutput> {
        const createUserUseCase = new CreateUserUseCase(this._userRepository);

        const hashPassword = await hash(data.password, 8);
        const userObj = {
            ...data,
            password: hashPassword
        };

        return await createUserUseCase.execute(userObj);
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
}
