import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ProductService} from "./product.service";
import {AuthGuard} from "../../libs/shared/src/guards/auth.guard";
import {ProductCreateDto} from "../../libs/shared/src/dtos/product-create.dto";
import {ProductUpdateDto} from "../../libs/shared/src/dtos/product-update.dto";

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {
    }

    @Get()
    async all(@Query('page') page = 1) {
        return this.productService.paginate(page);
    }

    @Post()
    async create(@Body() body: ProductCreateDto) {
        return this.productService.create(body);
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.productService.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: ProductUpdateDto
    ) {
        await this.productService.update(id, body);

        return this.productService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id);
    }
}
