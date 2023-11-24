import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {NomenclatureService} from "../nomenclature/nomenclature.service";
import {Product} from "./product.entity";
import {ProductItem} from "./product-item/product-item.entity";
import {CreateProductDto} from "./dto/create-product.dto";

@Injectable()
export class ProductService {


    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
                @InjectRepository(ProductItem) private productItemRepository: Repository<ProductItem>,
                private nomenclatureService: NomenclatureService
    ) {
    }


    // Assuming you have a function to save data
    async create (dto: CreateProductDto) {

        // Create GoodsInwards instance
        const product = new Product();
        product.date = dto.date;
        product.name = dto.name;
        product.category = dto.category;
        product.imageUrl = dto.imageUrl;
        product.totalCost = dto.totalCost;
        product.salePrice = dto.salePrice;
        product.grossProfit = dto.grossProfit;
        product.grossProfitMargin = dto.grossProfitMargin;

        // Save GoodsInwards instance
        await this.productRepository.save(product);

        // Create and save GoodsInwardsItem instances
        for (const itemData of dto.productItem) {
            const productItem = new ProductItem();
            productItem.product = product; // Set the relationship
            // @ts-ignore
            productItem.nomenclature = await this.nomenclatureService.findOne(itemData.nomenclatureID) // Set the relationship with Nomenclature
            productItem.unitOfMeasure = itemData.unit;
            productItem.quantity = itemData.quantity;
            productItem.price = itemData.price;
            productItem.sum = itemData.sum;
            productItem.date = dto.date;

            // Save GoodsInwardsItem instance
            await this.productItemRepository.save(productItem);
        }
    }

    findAll() {
        return this.productRepository.find({
            relations: ['productItems', 'productItems.nomenclature'], // Include the necessary relationships
        })
    }


    async remove(id:number) {
        const product = await this.productRepository.findOne({where: {id: id}})
        await this.productRepository.remove(product)
    }
}


