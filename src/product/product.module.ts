import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductItemController } from './product-item/product-item.controller';
import { ProductItemService } from './product-item/product-item.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductItem} from "./product-item/product-item.entity";
import {Product} from "./product.entity";
import {NomenclatureService} from "../nomenclature/nomenclature.service";
import {Nomenclature} from "../nomenclature/nomenclature.entity";


@Module({
  controllers: [ProductController, ProductItemController],
  providers: [ProductService, ProductItemService, NomenclatureService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductItem, Nomenclature])
  ]
})
export class ProductModule {}
