import { HttpStatus } from "@nestjs/common";

export class AppError {
    public readonly message: string;
    public readonly status: number;

    constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
        this.message = message;
        this.status = status;
    }
}