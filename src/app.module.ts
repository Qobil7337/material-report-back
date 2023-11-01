import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NomenclatureModule } from './nomenclature/nomenclature.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Nomenclature} from "./nomenclature/nomenclature.entity";
import { GoodsInwardsModule } from './goods-inwards/goods-inwards.module';
import {GoodsInwardsItemModule} from "./goods-inwards/goods-inwards-item/goods-inwards-item.module";

@Module({
  imports: [
      NomenclatureModule,
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
      GoodsInwardsModule,
      GoodsInwardsItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
