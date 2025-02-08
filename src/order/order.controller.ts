import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Query,
    Res,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {OrderService} from "./order.service";
import {AuthGuard} from "../../libs/shared/src/guards/auth.guard";
import {Response} from 'express';
import {Parser} from "json2csv";
import {Order} from "../../libs/shared/src/entities/order.entity";
import {OrderItem} from "../../libs/shared/src/entities/order-item.entity";
import {HasPermission} from "../../libs/shared/src/decorators/has-permission.decorator";

@UseInterceptors(ClassSerializerInterceptor)
@HasPermission(["admin" , "manager"])
@UseGuards(AuthGuard)
@Controller()
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Get('orders')
    // @HasPermission('orders')
    async all(@Query('page') page = 1) {
        return this.orderService.paginate(page, ['order_items']);
    }

    @Post('export')
    // @HasPermission('orders')
    async export(@Res() res: Response) {
        const parser = new Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });

        const orders = await this.orderService.all(['order_items']);

        const json = [];

        orders.forEach((o: Order) => {
            json.push({
                ID: o.id,
                Name: o.name,
                Email: o.email,
                'Product Title': '',
                Price: '',
                Quantity: ''
            });

            o.order_items.forEach((i: OrderItem) => {
                json.push({
                    ID: '',
                    Name: '',
                    Email: '',
                    'Product Title': i.product_title,
                    Price: i.price,
                    Quantity: i.quantity
                });
            })
        });

        const csv = parser.parse(json);
        res.header('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        return res.send(csv);
    }

    @Get('chart')
    // @HasPermission('orders')
    async chart() {
        return this.orderService.chart();
    }
}
