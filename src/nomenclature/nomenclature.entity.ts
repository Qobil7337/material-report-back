import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {GoodsInwardsItem} from "../goods-inwards/goods-inwards-item/goods-inwards-item.entity";

@Entity()
export class Nomenclature {
    @PrimaryGeneratedColumn()
    id: number;


    @IsNotEmpty()
    @Column()
    name: string;

    @OneToMany(() => GoodsInwardsItem, (goodsInwardsItem) => goodsInwardsItem.nomenclature)
    goodsInwardsItems: GoodsInwardsItem[]
}
