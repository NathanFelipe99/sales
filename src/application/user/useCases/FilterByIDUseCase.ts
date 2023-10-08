import { IUserRepository } from "src/base/user.repository";
import { AppError } from "src/shared/errors/AppError";
import { UserOutput } from "src/shared/utils/types/user.types";

export class FilterByIDUseCase {
    constructor(
        private readonly _userRepository: IUserRepository
    ) { }
    
    async execute(id: string): Promise<UserOutput> {
        const foundUser = await this._userRepository.findByID(id);
        if (!foundUser) throw new AppError("This ID doesn't match any user!", 400);
        return foundUser;
    }
}