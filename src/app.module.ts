import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NomenclatureModule } from './nomenclature/nomenclature.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Nomenclature} from "./nomenclature/nomenclature.entity";
import { GoodsInwardsModule } from './goods-inwards/goods-inwards.module';
import {GoodsInwardsItemModule} from "./goods-inwards/goods-inwards-item/goods-inwards-item.module";
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'sales-report',
        entities: [Nomenclature],
        synchronize: true,
        autoLoadEntities: true,
    }),
      NomenclatureModule,
      GoodsInwardsModule,
      GoodsInwardsItemModule,
      WarehouseModule,
      ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
