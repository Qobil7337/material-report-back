import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {GoodsInwardsItem} from "./goods-inwards-item.entity";
import {Repository} from "typeorm";
import {CreateGoodsInwardsItemDto} from "./dto/create-goods-inwards-item.dto";

@Injectable()
export class GoodsInwardsItemService {

    constructor(@InjectRepository(GoodsInwardsItem) private goodsInwardsItemRepository: Repository<GoodsInwardsItem>) {
    }

    create(dto: CreateGoodsInwardsItemDto) {
        const goodsInwardsItem = dto
        return this.goodsInwardsItemRepository.save(goodsInwardsItem)
    }
}
