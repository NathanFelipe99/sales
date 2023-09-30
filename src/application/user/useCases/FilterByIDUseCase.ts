import { IUserRepository } from "src/base/user.repository";
import { UserOutput } from "src/shared/utils/types/user.types";

export class FilterByIDUseCase {
    constructor(
        private readonly _userRepository: IUserRepository
    ) { }
    
    async execute(id: string): Promise<UserOutput> {
        return this._userRepository.findByID(id);
    }
}