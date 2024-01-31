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
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
// Assuming this is in the app.module.ts file
const certificatePath = path.join(__dirname, '../ca-certificate.crt');
@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.env'
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DB,
        entities: [Nomenclature],
        synchronize: true,
        autoLoadEntities: true,
          // ssl: {
          //     ca: fs.readFileSync(certificatePath),
          //     rejectUnauthorized: true, // Set this to true in production with valid certificates
          // },
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
