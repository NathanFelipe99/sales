import { CreateUserInput } from "src/shared/utils/types/user.types";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "username", unique: true, length: 40 })
    username: string;

    @Column({ name: "name", length: 60 })
    name: string;

    @Column({ name: "email", unique: true, length: 60 })
    email: string;

    @Column({ name: "password", default: "" })
    password: string;

    @Column({ name: "phone", length: 11 })
    phone: string;

    @CreateDateColumn({ name: "createdAt", select: false })
    createdAt?: Date;

    @UpdateDateColumn({ name: "updatedAt", select: false })
    updatedAt?: Date;

    @Column({ name: "isActive", default: true })
    isActive: boolean;

    constructor(props?: CreateUserInput) {
        if (!this.id) {
            this.id = uuidV4();
            this.createdAt = new Date();
            this.isActive = true;
        }

        if (props && Object.keys(props)["length"]) {
            this.username = props.username;
            this.name = props.name;
            this.password = props.password;
            this.email = props.email;
            this.phone = props.phone;
        }

    }

    toJSON() {
        const { id, username, name, email, phone } = this;
        return {
            id,
            username,
            name,
            email,
            phone
        };
    }
}