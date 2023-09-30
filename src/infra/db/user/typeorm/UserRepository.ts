import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/user/User";
import { IUserRepository } from "src/base/user.repository";
import { CreateUserInput, UserOutput } from "src/shared/utils/types/user.types";
import { Repository } from "typeorm";

export class UserRepository implements IUserRepository {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }
    
    insert(props: CreateUserInput): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<UserOutput[]> {
        throw new Error("Method not implemented.");
    }

}