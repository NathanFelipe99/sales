import { IGetUsersDTO } from "src/domain/user/DTOs/IGetUsersDTO";

export type UserOutput = {
    id?: string;
    username: string;
    name: string;
    email: string;
    phone?: string;
};

export type CreateUserInput = {
    username: string;
    password: string;
    name: string;
    email: string;
    phone?: string;
};

export type UpdateUserInput = {
    name?: string;
    email?: string;
    phone?: string;
}

export type FindUsersParams = IGetUsersDTO | Array<IGetUsersDTO>;