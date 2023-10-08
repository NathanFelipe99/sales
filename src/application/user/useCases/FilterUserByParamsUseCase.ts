import { IUserRepository } from "src/base/user.repository";
import { IGetUsersDTO } from "src/domain/user/DTOs/IGetUsersDTO";
import { UserOutput } from "src/shared/utils/types/user.types";

export class FilterUserByParamsUseCase {
    constructor(
        private readonly _userRepository: IUserRepository
    ) { }

    async execute(data: IGetUsersDTO): Promise<UserOutput[]> {
        return await this._userRepository.findByParams(data);
    }
}