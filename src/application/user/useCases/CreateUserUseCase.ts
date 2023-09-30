import { User } from "src/domain/user/User";
import { IUserRepository } from "src/base/user.repository";
import { CreateUserInput, UserOutput } from "src/shared/utils/types/user.types";

export class CreateUserUseCase {
    constructor(
        private readonly _userRepository: IUserRepository
    ) { }
    
    async execute(data: CreateUserInput): Promise<UserOutput>{
        const user = new User(data);
        await this._userRepository.insert(user);
        return user.toJSON();
    }
}