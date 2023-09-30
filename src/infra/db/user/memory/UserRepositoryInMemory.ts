import { User } from "src/domain/user/User";
import { IUserRepository } from "src/base/user.repository";
import { UpdateUserInput, UserOutput } from "src/shared/utils/types/user.types";
import { IGetUsersDTO } from "src/domain/user/DTOs/IGetUsersDTO";

export class UserRepositoryInMemory implements IUserRepository {
    users: User[] = [];

    async insert(userData: User): Promise<void> {
        this.users.push(userData);
    }

    async findAll(): Promise<UserOutput[]> {
        return this.users;
    }

    async findByID(id: string): Promise<UserOutput> {
        return this.users.find((user) => user.id === id);
    }

    async findByParams(data: IGetUsersDTO): Promise<UserOutput[]> {
        return this.users.filter((user) => {
            (user.id === data.id) || (user.username === data.username) || (user.name === data.name) || (user.email === data.email) || (user.phone === data.phone) || (user.isActive === data.isActive)
        });
    }

    async update(id: string, data: UpdateUserInput): Promise<UserOutput> {
        const foundUserIndex = this.users.findIndex((user) => user.id === id);

        if (foundUserIndex) {
            this.users[foundUserIndex].name = data.name;
            this.users[foundUserIndex].email = data.email;
            this.users[foundUserIndex].phone = data.phone;
        }

        return this.users[foundUserIndex];
    }

    inactivate(id: string): void {
        const foundUserIndex = this.users.findIndex((user) => user.id === id);

        if (foundUserIndex) {
            this.users[foundUserIndex].isActive = false;
        }
    }
}