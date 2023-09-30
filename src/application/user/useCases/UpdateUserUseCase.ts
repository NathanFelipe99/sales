import { IUserRepository } from "src/base/user.repository";
import { UpdateUserInput, UserOutput } from "src/shared/utils/types/user.types";

export class UpdateUserUseCase {
    constructor(
        private readonly _userRepository: IUserRepository
    ) { }
    
    async execute(id: string, data: UpdateUserInput): Promise<UserOutput>{
        return this._userRepository.update(id, data);
    } 
}