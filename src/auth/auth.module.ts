import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {UserModule} from "../user/user.module";
import {CommonModule} from "../../libs/shared/src/common.module";
import {AuthService} from './auth.service';
import { RoleService } from 'src/role/role.service';
import { RoleModule } from 'src/role/role.module';

@Module({
    imports: [
        forwardRef(() => UserModule),
        CommonModule,RoleModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {
}
