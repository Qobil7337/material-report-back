import { Module } from '@nestjs/common';
import { NomenclatureService } from './nomenclature.service';
import { NomenclatureController } from './nomenclature.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Nomenclature} from "./nomenclature.entity";
import {GoodsInwards} from "../goods-inwards/goods-inwards.entity";
import {GoodsInwardsItem} from "../goods-inwards/goods-inwards-item/goods-inwards-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Nomenclature, GoodsInwards, GoodsInwardsItem])],
  providers: [NomenclatureService],
  controllers: [NomenclatureController]
})
export class NomenclatureModule {}
