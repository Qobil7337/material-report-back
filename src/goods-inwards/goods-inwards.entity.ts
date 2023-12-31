import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import { GoodsInwardsItem } from "./goods-inwards-item/goods-inwards-item.entity";


@Entity()
export class GoodsInwards {
    // Primary key
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNotEmpty()
    supplier: string;

    // Foreign key
    @Column()
    @IsNotEmpty()
    warehouse: string;

    @Column()
    @IsNotEmpty()
    totalSum: number;

    @Column()
    @IsNotEmpty()
    date: Date;

    @OneToMany(() => GoodsInwardsItem, (goodsInwardsItem) => goodsInwardsItem.goodsInwards)
    goodsInwardsItems: GoodsInwardsItem[]
}
