import {Module} from '@nestjs/common';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {CommonModule} from "../../libs/shared/src/common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "../../libs/shared/src/entities/order.entity";
import {OrderItem} from "../../libs/shared/src/entities/order-item.entity";

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([Order, OrderItem])
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {
}
