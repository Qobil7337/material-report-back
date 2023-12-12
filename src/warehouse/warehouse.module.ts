import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Nomenclature} from "../nomenclature/nomenclature.entity";
import {Warehouse} from "./warehouse.entity";
import {Product} from "../product/product.entity";
import {NomenclatureService} from "../nomenclature/nomenclature.service";


@Module({
  providers: [WarehouseService],
  controllers: [WarehouseController],
  imports: [
    TypeOrmModule.forFeature([Warehouse, Nomenclature, Product ])
  ]
})
export class WarehouseModule {}
