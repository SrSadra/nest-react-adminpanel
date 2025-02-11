import {Injectable} from '@nestjs/common';
import {Request} from 'express';
import {JwtService} from "@nestjs/jwt";
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private readonly userService: UserService, private readonly roleSer: RoleService) {
    }

    async userId(request: Request): Promise<number> {
        const cookie = request.cookies['jwt'];

        const data = await this.jwtService.verifyAsync(cookie);

        return data['id'];
    }

    async create(first_name: string, last_name: string, email: string, password: string){
        const hashed = await bcrypt.hash(password, 12);
        const role = await this.roleSer.findOne({id: 1});
        return this.userService.create({
            first_name,
            last_name,
            email,
            password: hashed,
            role // user role
        });
    }
}
