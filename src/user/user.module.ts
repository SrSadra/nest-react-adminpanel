import {forwardRef, Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../libs/shared/src/entities/user.entity";
import {UserService} from './user.service';
import {CommonModule} from "../../libs/shared/src/common.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CommonModule,
        AuthModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {
}
