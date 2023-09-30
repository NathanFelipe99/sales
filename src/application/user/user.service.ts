import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInput, UserOutput } from 'src/shared/utils/types/user.types';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { IUserRepository } from 'src/base/user.repository';
import { UserRepositoryInMemory } from 'src/infra/db/user/memory/UserRepositoryInMemory';
import { ListAllUserUseCase } from './useCases/ListAllUserUseCase';

@Injectable()
export class UserService {
    private readonly _userRepository: IUserRepository;
    constructor() {
        this._userRepository = new UserRepositoryInMemory();
    }
    
    async createUser(data: CreateUserInput): Promise<UserOutput>{
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
}
