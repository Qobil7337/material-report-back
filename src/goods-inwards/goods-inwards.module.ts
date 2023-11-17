import { Module } from '@nestjs/common';
import { GoodsInwardsController } from './goods-inwards.controller';
import { GoodsInwardsService } from './goods-inwards.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {GoodsInwards} from "./goods-inwards.entity";
import {GoodsInwardsItem} from "./goods-inwards-item/goods-inwards-item.entity";
import {Nomenclature} from "../nomenclature/nomenclature.entity";
import {NomenclatureService} from "../nomenclature/nomenclature.service";

@Module({
  controllers: [GoodsInwardsController],
  providers: [GoodsInwardsService,NomenclatureService],
  imports: [
      TypeOrmModule.forFeature([GoodsInwards, Nomenclature, GoodsInwardsItem])
  ]
})
export class GoodsInwardsModule {}
