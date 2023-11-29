import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItemController } from './order-item/order-item.controller';
import { OrderItemService } from './order-item/order-item.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "../product/product.entity";
import {OrderItem} from "./order-item/order-item.entity";
import {Order} from "./order.entity";
import {ProductService} from "../product/product.service";
import {Nomenclature} from "../nomenclature/nomenclature.entity";
import {ProductItem} from "../product/product-item/product-item.entity";
import {NomenclatureService} from "../nomenclature/nomenclature.service";

@Module({
  controllers: [OrderController, OrderItemController],
  providers: [OrderService, OrderItemService, ProductService,NomenclatureService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product, Nomenclature, ProductItem])
  ]
})
export class OrderModule {}
