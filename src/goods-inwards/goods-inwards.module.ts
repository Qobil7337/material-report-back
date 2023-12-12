import { Module } from '@nestjs/common';
import { GoodsInwardsController } from './goods-inwards.controller';
import { GoodsInwardsService } from './goods-inwards.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {GoodsInwards} from "./goods-inwards.entity";
import {GoodsInwardsItem} from "./goods-inwards-item/goods-inwards-item.entity";
import {Nomenclature} from "../nomenclature/nomenclature.entity";
import {NomenclatureService} from "../nomenclature/nomenclature.service";
import {Warehouse} from "../warehouse/warehouse.entity";
import {WarehouseService} from "../warehouse/warehouse.service";
import {Product} from "../product/product.entity";

@Module({
  controllers: [GoodsInwardsController],
  providers: [GoodsInwardsService,NomenclatureService, WarehouseService],
  imports: [
      TypeOrmModule.forFeature([GoodsInwards, Nomenclature, GoodsInwardsItem, Warehouse, Product])
  ]
})
export class GoodsInwardsModule {}
