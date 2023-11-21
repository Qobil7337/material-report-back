import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {GoodsInwardsItem} from "../goods-inwards/goods-inwards-item/goods-inwards-item.entity";
import {ProductItem} from "../product/product-item/product-item.entity";

@Entity()
export class Nomenclature {
    // Primary key
    @PrimaryGeneratedColumn()
    id: number;


    @IsNotEmpty()
    @Column()
    name: string;

    @OneToMany(() => GoodsInwardsItem, (goodsInwardsItem) => goodsInwardsItem.nomenclature)
    goodsInwardsItems: GoodsInwardsItem[]

    @OneToMany(() => ProductItem, (productItem) => productItem.nomenclature)
    productItems: ProductItem[]
}
