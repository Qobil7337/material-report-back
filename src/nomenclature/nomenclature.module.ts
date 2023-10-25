import { Module } from '@nestjs/common';
import { NomenclatureService } from './nomenclature.service';
import { NomenclatureController } from './nomenclature.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Nomenclature} from "./nomenclature.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Nomenclature])],
  providers: [NomenclatureService],
  controllers: [NomenclatureController]
})
export class NomenclatureModule {}
