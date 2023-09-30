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