import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/user/user.entity";
import { IUserRepository } from "src/base/user.repository";
import { CreateUserInput, UpdateUserInput, UserOutput } from "src/shared/utils/types/user.types";
import { Repository } from "typeorm";
import { IGetUsersDTO } from "src/domain/user/DTOs/IGetUsersDTO";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findByID(id: string): Promise<UserOutput> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async findByParams(data: IGetUsersDTO): Promise<UserOutput[]> {
        const { username, name, email, phone, isActive } = data;
        return await this.userRepository.findBy([
            { username },
            { name },
            { email },
            { phone },
            { isActive }
        ]);
    }

    async update(id: string, data: UpdateUserInput): Promise<UserOutput> {
        await this.userRepository
            .createQueryBuilder()
            .update()
            .set({
                ...data
            })
            .where("id = :id", { id })
            .execute();

        return this.userRepository.findOne({ where: { id } });
    }

    async inactivate(id: string): Promise<void> {
        await this.userRepository
            .createQueryBuilder()
            .update()
            .set({
                isActive: false
            })
            .where("id = :id", { id })
            .execute();
    }

    async insert(props: CreateUserInput): Promise<void> {
        const user = this.userRepository.create({ ...props });
        await this.userRepository.save(user);
    }

    async findAll(): Promise<UserOutput[]> {
        return await this.userRepository.find();
    }

}