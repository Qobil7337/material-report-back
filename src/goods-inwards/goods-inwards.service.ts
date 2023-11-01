import { Injectable } from '@nestjs/common';
import {CreateGoodsInwardsDto} from "./dto/create-goods-inwards.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {GoodsInwards} from "./goods-inwards.entity";
import {Repository} from "typeorm";

@Injectable()
export class GoodsInwardsService {

    constructor(@InjectRepository(GoodsInwards) private goodsInwardsRepository: Repository<GoodsInwards>) {
    }

    create(dto: CreateGoodsInwardsDto) {
        const goodsInwards = dto
        return this.goodsInwardsRepository.save(goodsInwards)
    }
}
