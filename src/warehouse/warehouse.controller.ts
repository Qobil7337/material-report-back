import {Controller, Get} from '@nestjs/common';
import {WarehouseService} from "./warehouse.service";

@Controller('warehouse')
export class WarehouseController {

    constructor(private warehouseService: WarehouseService) {
    }
    @Get()
    async findAll() {
        return this.warehouseService.findAll()
    }
}
