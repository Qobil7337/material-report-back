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
import { OrderModule } from './order/order.module';
import * as fs from "fs";
import * as path from "path";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'db-postgresql-nyc3-74722-do-user-15359789-0.c.db.ondigitalocean.com',
        port: 25060,
        username: 'doadmin',
        password: 'AVNS_yeSZgYf2BZzCV-fNGDQ',
        database: 'defaultdb',
        entities: [Nomenclature],
        synchronize: true,
        autoLoadEntities: true,
        ssl: {
          ca: fs.readFileSync('/Users/kobiljonmdis/Downloads/ca-certificate.crt'), // Path to CA certificate file
          rejectUnauthorized: true, // Set this to true in production with valid certificates
        },
        connectTimeoutMS: 10000,
      }),
      NomenclatureModule,
      GoodsInwardsModule,
      GoodsInwardsItemModule,
      WarehouseModule,
      ProductModule,
      OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
