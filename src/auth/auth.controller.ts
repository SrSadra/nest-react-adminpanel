import {
    BadRequestException,
    Body, ClassSerializerInterceptor,
    Controller,
    Get,
    NotFoundException,
    Post, Put,
    Req,
    Res, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs';
import {RegisterDto} from "../../libs/shared/src/dtos/register.dto";
import {JwtService} from "@nestjs/jwt";
import {Request, Response} from 'express';
import {AuthGuard} from "../../libs/shared/src/guards/auth.guard";
import {AuthService} from "./auth.service";

// @UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService
    ) {
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        console.log(body);
        if (body.password !== body.password_confirm) {
            throw new BadRequestException('Passwords do not match!');
        }

        return await this.authService.create(
            body.first_name,
            body.last_name,
            body.email,
            body.password,
        );
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response //this allows you to modify the response (e.g., setting cookies) without losing the ability to return a value that to be handled normally.
    ) {
        
        const user = await this.userService.findOne({email});

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true});

        return user;
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        const id = await this.authService.userId(request);

        return this.userService.findOne({id});
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'Success'
        }
    }
}
