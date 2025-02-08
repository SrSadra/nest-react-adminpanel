import {Module} from '@nestjs/common';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "../../libs/shared/src/entities/product.entity";
import {CommonModule} from "../../libs/shared/src/common.module";
import {UploadController} from "./upload.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        CommonModule
    ],
    controllers: [ProductController, UploadController],
    providers: [ProductService]
})
export class ProductModule {
}
