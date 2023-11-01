import {Body, Controller, Post} from '@nestjs/common';
import {CreateGoodsInwardsDto} from "./dto/create-goods-inwards.dto";
import {GoodsInwardsService} from "./goods-inwards.service";

@Controller('goods-inwards')
export class GoodsInwardsController {

    constructor(private goodsInwardsService: GoodsInwardsService) {
    }

    @Post()
    create(@Body() dto: CreateGoodsInwardsDto) {
        return this.goodsInwardsService.create(dto)
    }
}
