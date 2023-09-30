import { IUserRepository } from "src/base/user.repository";
import { UserOutput } from "src/shared/utils/types/user.types";

export class ListAllUserUseCase {
    constructor(
        private readonly _userRepository: IUserRepository
    ) { }

    async execute(): Promise<UserOutput[]> {
        return await this._userRepository.findAll();
    }
}