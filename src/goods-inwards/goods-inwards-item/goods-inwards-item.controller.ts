import {Controller, Post} from '@nestjs/common';
import {GoodsInwardsService} from "../goods-inwards.service";

@Controller('goods-inwards-item')
export class GoodsInwardsItemController {
    constructor(private goodsInwardsService: GoodsInwardsService) {
    }

    @Post()
    create() {
        return this.goodsInwardsService.create()
    }
}
