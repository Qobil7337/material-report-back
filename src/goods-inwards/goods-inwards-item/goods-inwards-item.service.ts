import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {GoodsInwardsItem} from "./goods-inwards-item.entity";
import {Repository} from "typeorm";

@Injectable()
export class GoodsInwardsItemService {

    constructor(@InjectRepository(GoodsInwardsItem) private goodsInwardsItemRepository: Repository<GoodsInwardsItem>) {
    }


}
