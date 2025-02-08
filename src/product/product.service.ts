import {Injectable} from '@nestjs/common';
import {AbstractService} from "../../libs/shared/src/repositories/abstract.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../../libs/shared/src/entities/product.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProductService extends AbstractService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) {
        super(productRepository);
    }
}
