import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {
    }

    @Post()
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto)
    }

    @Get()
    async findAll() {
        return this.productService.findAll()
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const numericId = Number(id);
        return this.productService.remove(numericId);
    }
}
