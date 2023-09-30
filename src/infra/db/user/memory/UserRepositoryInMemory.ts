import { User } from "src/domain/user/User";
import { IUserRepository } from "src/base/user.repository";
import { UserOutput } from "src/shared/utils/types/user.types";

export class UserRepositoryInMemory implements IUserRepository {
    users: User[] = [];
    
    async insert(userData: User): Promise<void> {
        this.users.push(userData);
        console.log(this.users);
    }

    async findAll(): Promise<UserOutput[]> {
        return this.users;
    }
}