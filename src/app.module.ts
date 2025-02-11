import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from './auth/auth.module';
import {CommonModule} from '../libs/shared/src/common.module';
import {RoleModule} from './role/role.module';
// import {PermissionModule} from './permission/permission.module';
import {ProductModule} from './product/product.module';
import {OrderModule} from './order/order.module';
import {APP_GUARD} from "@nestjs/core";
import {PermissionGuard} from "../libs/shared/src/guards/permission.guard";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderItem } from 'libs/shared/src/entities/order-item.entity';
import { Order } from 'libs/shared/src/entities/order.entity';
import { Product } from 'libs/shared/src/entities/product.entity';
import { Role } from 'libs/shared/src/entities/role.entity';
import { User } from 'libs/shared/src/entities/user.entity';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configSer: ConfigService) => ({
            type: 'mysql',
            host: configSer.get("MYSQL_HOST"),
            port: configSer.get("MYSQL_PORT"),
            username: configSer.get("MYSQL_USERNAME"),
            password: configSer.get("MYSQL_PASS"),
            database: configSer.get("MYSQL_DB"),
            autoLoadEntities: true,
            synchronize: true,
            entities : [OrderItem,Order, Product, Role, User]
        }),
        inject : [ConfigService] 
        }),
        ConfigModule.forRoot({isGlobal: true}),
        AuthModule,
        CommonModule,
        RoleModule,
        // PermissionModule,
        ProductModule,
        OrderModule,
    ],
    providers: [
        {
            provide: APP_GUARD, // this is for make guard global
            useClass: PermissionGuard
        }
    ]
})
export class AppModule {
}
