import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    // app.useBodyParser('json'); // Ensures request body is parsed as JSON
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true
    });
    await app.listen(10009);
}

bootstrap();
