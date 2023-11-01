import { Module } from '@nestjs/common';
import { GoodsInwardsItemService } from './goods-inwards-item.service';
import { GoodsInwardsItemController } from './goods-inwards-item.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {GoodsInwards} from "../goods-inwards.entity";
import {Nomenclature} from "../../nomenclature/nomenclature.entity";

@Module({
  providers: [GoodsInwardsItemService],
  controllers: [GoodsInwardsItemController],
  imports: [TypeOrmModule.forFeature([GoodsInwards, Nomenclature])]
})
export class GoodsInwardsItemModule {}
