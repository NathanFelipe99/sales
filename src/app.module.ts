import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './application/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AppErrorFilter } from './shared/errors/app-error.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env.development.local"
        }),
        UserModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            schema: process.env.DB_SCHEMA,
            synchronize: true,
            entities: [`${__dirname}/**/*.entity{.js,.ts}`]
        })
    ],
    controllers: [],
    providers: [{
        provide: APP_FILTER,
        useClass: AppErrorFilter
    }],
})
export class AppModule { }
