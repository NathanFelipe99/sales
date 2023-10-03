import { HttpStatus } from "@nestjs/common";

export class AppError {
    public readonly message: string;
    public readonly status: number;

    constructor(message: string, status: HttpStatus) {
        this.message = message;
        this.status = status;
    }
}