import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {OrderService} from "./order.service";
import {CreateOrderDto} from "./dto/create-order.dto";

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {
    }

    @Post()
    async create(@Body() dto: CreateOrderDto) {
        return this.orderService.create(dto)
    }

    @Get()
    async findAll() {
        return this.orderService.findAll()
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const numericId = Number(id);
        return this.orderService.remove(numericId);
    }
}
