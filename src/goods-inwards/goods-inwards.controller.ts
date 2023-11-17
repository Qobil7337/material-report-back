import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {CreateGoodsInwardsDto} from "./dto/create-goods-inwards.dto";
import {GoodsInwardsService} from "./goods-inwards.service";

@Controller('goods-inwards')
export class GoodsInwardsController {

    constructor(private goodsInwardsService: GoodsInwardsService) {
    }

    @Post()
    async create(@Body() dto: CreateGoodsInwardsDto) {
        return this.goodsInwardsService.create(dto)
    }

    @Get()
    async findAll() {
        return this.goodsInwardsService.findAll()
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const numericId = Number(id);
        return this.goodsInwardsService.remove(numericId);
    }

}
