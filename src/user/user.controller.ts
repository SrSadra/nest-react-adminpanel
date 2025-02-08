import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller, Delete, forwardRef,
    Get, Inject,
    Param,
    Post, Put, Query, Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "../../libs/shared/src/entities/user.entity";
import * as bcrypt from 'bcryptjs';
import {UserCreateDto} from "../../libs/shared/src/dtos/user-create.dto";
import {AuthGuard} from "../../libs/shared/src/guards/auth.guard";
import {UserUpdateDto} from "../../libs/shared/src/dtos/user-update.dto";
import {AuthService} from "../auth/auth.service";
import {Request} from 'express';
import {HasPermission} from "../../libs/shared/src/decorators/has-permission.decorator";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {
    }

    @Get()
    // @HasPermission('users')
    @HasPermission(["user"])
    async all(@Query('page') page = 1) {
        return this.userService.paginate(page, ['role']);
    }

    @Post()
    // @HasPermission('users')
    @HasPermission(["user"])
    async create(@Body() body: UserCreateDto): Promise<User> {
        const password = await bcrypt.hash('1234', 12);

        const {role_id, ...data} = body;

        return this.userService.create({
            ...data,
            password,
            role: {id: role_id}
        });
    }

    @Get(':id')
    // @HasPermission('users')
    @HasPermission(["user"])
    async get(@Param('id') id: number) {
        return this.userService.findOne({id}, ['role']);
    }

    @Put('info')
    async updateInfo(
        @Req() request: Request,
        @Body() body: UserUpdateDto
    ) {
        const id = await this.authService.userId(request);

        await this.userService.update(id, body);

        return this.userService.findOne({id});
    }

    @Put('password')
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ) {
        if (password !== password_confirm) {
            throw new BadRequestException('Passwords do not match!');
        }

        const id = await this.authService.userId(request);

        const hashed = await bcrypt.hash(password, 12);

        await this.userService.update(id, {
            password: hashed
        });

        return this.userService.findOne({id});
    }

    @Put(':id')
    // @HasPermission('users')
    @HasPermission(["user"])
    async update(
        @Param('id') id: number,
        @Body() body: UserUpdateDto
    ) {
        const {role_id, ...data} = body;

        await this.userService.update(id, {
            ...data,
            role: {id: role_id}
        });

        return this.userService.findOne({id});
    }

    @Delete(':id')
    // @HasPermission('users')
    @HasPermission(["user"])
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
