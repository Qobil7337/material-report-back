import {Injectable} from '@nestjs/common';
import {CreateGoodsInwardsDto} from "./dto/create-goods-inwards.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {GoodsInwards} from "./goods-inwards.entity";
import {Repository} from "typeorm";
import {GoodsInwardsItem} from "./goods-inwards-item/goods-inwards-item.entity";
import {NomenclatureService} from "../nomenclature/nomenclature.service";
import {WarehouseService} from "../warehouse/warehouse.service";

@Injectable()
export class GoodsInwardsService {

    constructor(@InjectRepository(GoodsInwards) private goodsInwardsRepository: Repository<GoodsInwards>,
                @InjectRepository(GoodsInwardsItem) private goodsInwardsItemRepository: Repository<GoodsInwardsItem>,
                private nomenclatureService: NomenclatureService,
                private warehouseService: WarehouseService
                ) {
    }


        // Assuming you have a function to save data
        async create (dto: CreateGoodsInwardsDto) {

            // Create GoodsInwards instance
            const goodsInwards = new GoodsInwards();
            goodsInwards.date = dto.date;
            goodsInwards.supplier = dto.supplier;
            goodsInwards.warehouse = dto.warehouse;
            goodsInwards.totalSum = dto.totalSum;

            // Save GoodsInwards instance
            await this.goodsInwardsRepository.save(goodsInwards);

            // Create and save GoodsInwardsItem instances
            for (const itemData of dto.goodsInwardsItems) {
                const goodsInwardsItem = new GoodsInwardsItem();
                goodsInwardsItem.goodsInwards = goodsInwards; // Set the relationship
                // @ts-ignore
                goodsInwardsItem.nomenclature = await this.nomenclatureService.findOne(itemData.nomenclatureID) // Set the relationship with Nomenclature
                goodsInwardsItem.unitOfMeasure = itemData.unit;
                goodsInwardsItem.quantity = itemData.quantity;
                goodsInwardsItem.price = itemData.price;
                goodsInwardsItem.sum = itemData.sum;
                goodsInwardsItem.date = dto.date;

                // Save GoodsInwardsItem instance
                await this.goodsInwardsItemRepository.save(goodsInwardsItem);
            }
            await this.warehouseService.onSaveGoodsInwards(dto)
        }

        findAll() {
            return this.goodsInwardsRepository.find({
                relations: ['goodsInwardsItems', 'goodsInwardsItems.nomenclature'], // Include the necessary relationships
            })
        }


        async remove(id:number) {
            const goodsInwards = await this.goodsInwardsRepository.findOne({where: {id: id}})
            const goodsInwardsWithItems = await this.goodsInwardsRepository.findOne({where: {id: id}, relations: ['goodsInwardsItems', 'goodsInwardsItems.nomenclature']})
            await this.warehouseService.onRemoveGoodsInwards(goodsInwardsWithItems)
            await this.goodsInwardsRepository.remove(goodsInwards)
        }
}
