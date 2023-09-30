import { IUserRepository } from "src/base/user.repository";

export class InactivateUserUseCase {
    constructor(
        private readonly _userRepository: IUserRepository
    ) { }
    
    async execute(id: string): Promise<void> {
        return this._userRepository.inactivate(id);
    }
}