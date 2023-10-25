import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateNomenclatureDto} from "./dto/create-nomenclature.dto";
import {NomenclatureService} from "./nomenclature.service";
import {UpdateNomenclatureDto} from "./dto/update-nomenclature.dto";

@Controller('nomenclature')
export class NomenclatureController {

    constructor(private nomenclatureService: NomenclatureService) {
    }

    @Get()
    findAll() {
        return this.nomenclatureService.findAll()
    }

    @Get(':id')
    findOne(@Param() id: number) {
        return this.nomenclatureService.findOne(id)
    }

    @Post()
    createNomenclature(@Body() dto: CreateNomenclatureDto) {
        return this.nomenclatureService.create(dto)
    }

    @Delete(':id')
    remove(@Param() id: number) {
        return this.nomenclatureService.remove(id)
    }

    @Put(':id')
    update(@Param() id: number, @Body() dto: UpdateNomenclatureDto) {
        return this.nomenclatureService.update(id, dto)
    }
}


