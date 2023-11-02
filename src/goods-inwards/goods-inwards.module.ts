import { Module } from '@nestjs/common';
import { GoodsInwardsController } from './goods-inwards.controller';
import { GoodsInwardsService } from './goods-inwards.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {GoodsInwards} from "./goods-inwards.entity";
import {GoodsInwardsItem} from "./goods-inwards-item/goods-inwards-item.entity";
import {Nomenclature} from "../nomenclature/nomenclature.entity";

@Module({
  controllers: [GoodsInwardsController],
  providers: [GoodsInwardsService],
  imports: [
      TypeOrmModule.forFeature([GoodsInwards, Nomenclature, GoodsInwardsItem])
  ]
})
export class GoodsInwardsModule {}
