import {Body, Controller, Post} from '@nestjs/common';
import {GoodsInwardsService} from "../goods-inwards.service";
import {GoodsInwardsItemService} from "./goods-inwards-item.service";
import {CreateGoodsInwardsItemDto} from "./dto/create-goods-inwards-item.dto";

@Controller('goods-inwards-item')
export class GoodsInwardsItemController {
    constructor(private goodsInwardsItemService: GoodsInwardsItemService) {
    }

    @Post()
    create(@Body() dto: CreateGoodsInwardsItemDto) {
        return this.goodsInwardsItemService.create(dto)
    }
}
