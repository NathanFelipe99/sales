import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './AppError';

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
    catch(exception: AppError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { status, message } = exception;
        response.status(status).json({
            status,
            message,
        });
    }
}