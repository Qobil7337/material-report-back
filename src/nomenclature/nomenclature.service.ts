import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Nomenclature} from "./nomenclature.entity";
import {Repository} from "typeorm";
import {CreateNomenclatureDto} from "./dto/create-nomenclature.dto";
import {UpdateNomenclatureDto} from "./dto/update-nomenclature.dto";

@Injectable()
export class NomenclatureService {
    constructor(
        @InjectRepository(Nomenclature)
        private nomenclatureRepository: Repository<Nomenclature>,
    ) {}

    async findAll(): Promise<Nomenclature[]> {
        return await this.nomenclatureRepository.find()
    }

    async findOne(id: number) {
        // @ts-ignore
        return await this.nomenclatureRepository.findOne(id)
    }

    async create(createNomenclatureDto: CreateNomenclatureDto) {
        const nomenclature = createNomenclatureDto
        return await this.nomenclatureRepository.save(nomenclature)
    }

    async update(id: number, updateNomenclatureDto: UpdateNomenclatureDto) {
        return await this.nomenclatureRepository.update(id, updateNomenclatureDto )
    }

    async remove(id: number): Promise<void> {
        await  this.nomenclatureRepository.delete(id);
    }
}
