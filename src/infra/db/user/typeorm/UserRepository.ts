import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/user/User";
import { IUserRepository } from "src/base/user.repository";
import { CreateUserInput, UpdateUserInput, UserOutput } from "src/shared/utils/types/user.types";
import { Repository } from "typeorm";
import { IGetUsersDTO } from "src/domain/user/DTOs/IGetUsersDTO";

export class UserRepository implements IUserRepository {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }
    findByID(id: string): Promise<UserOutput> {
        throw new Error("Method not implemented.");
    }
    findByParams(data: IGetUsersDTO): Promise<UserOutput[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateUserInput): Promise<UserOutput> {
        throw new Error("Method not implemented.");
    }
    inactivate(id: string): void {
        throw new Error("Method not implemented.");
    }
    
    insert(props: CreateUserInput): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<UserOutput[]> {
        throw new Error("Method not implemented.");
    }

}