import { CreateUserInput, UserOutput } from "src/shared/utils/types/user.types";

export interface IUserRepository {
    insert(props: CreateUserInput): Promise<void>;
    findAll(): Promise<UserOutput[]>;
}