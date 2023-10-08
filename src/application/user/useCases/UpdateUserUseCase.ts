import { IUserRepository } from "src/base/user.repository";
import { AppError } from "src/shared/errors/AppError";
import { UpdateUserInput, UserOutput } from "src/shared/utils/types/user.types";

export class UpdateUserUseCase {
    constructor(
        private readonly _userRepository: IUserRepository
    ) { }

    async execute(id: string, data: UpdateUserInput): Promise<UserOutput> {
        const { name, email, phone } = data;
        const userExists = await this._userRepository.findByID(id),
            emailAlreadyExists = await this._userRepository.findByParams({ email });

        if (!userExists) throw new AppError("This ID doesn't match any user!", 400);
        if (emailAlreadyExists.length && (email !== userExists.email)) throw new AppError("Email already in use!", 400);

        return this._userRepository.update(id, { name, email, phone });
    }
}