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
        const { id, username, name, email, phone, isActive } = data;

        return this.users.filter((user) => {
            return ((!id || user.id === id) && (!username || user.username === username) && (!name || user.name === name) && (!email || user.email === email) && (!phone || user.phone === phone) && (!isActive || user.isActive === isActive));
        });
    }

    async update(id: string, data: UpdateUserInput): Promise<UserOutput> {
        const foundUserIndex = this.users.findIndex((user) => user.id === id);

        if (foundUserIndex >= 0) {
            this.users[foundUserIndex].name = data.name;
            this.users[foundUserIndex].email = data.email;
            this.users[foundUserIndex].phone = data.phone;
            return this.findByID(id);
        }
    }

    inactivate(id: string): void {
        const foundUserIndex = this.users.findIndex((user) => user.id === id);

        if (foundUserIndex >= 0) {
            this.users[foundUserIndex].isActive = false;
        }
    }
}