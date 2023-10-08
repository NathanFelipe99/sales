import { IAuthOutput } from "src/application/auth/DTOs/IAuthOutput";
import { IGetUsersDTO } from "src/domain/user/DTOs/IGetUsersDTO";
import { CreateUserInput, UpdateUserInput, UserOutput } from "src/shared/utils/types/user.types";

export interface IUserRepository {
    insert(props: CreateUserInput): Promise<void>;
    findAll(): Promise<UserOutput[]>;
    findByID(id: string): Promise<UserOutput>;
    findByParams(data: IGetUsersDTO): Promise<UserOutput[]>;
    update(id: string, data: UpdateUserInput): Promise<UserOutput>;
    inactivate(id: string): void;
    getUserCredentials?(username: string): Promise<IAuthOutput>;
}