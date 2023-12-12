import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, IsNumber} from "class-validator";
import {Nomenclature} from "../../nomenclature/nomenclature.entity";
import {GoodsInwards} from "../goods-inwards.entity";

export enum Unit {
    kg = "kg",
    pc = "piece",
    litre = "litre"
}

@Entity()
export class GoodsInwardsItem {
    // Primary key
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id: number;

    @Column({type: "enum", enum: Unit, default: Unit.kg})
    @IsNotEmpty()
    unitOfMeasure: Unit;

    @Column({type: "numeric"})
    @IsNotEmpty()
    quantity: number;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    sum: number;

    @Column()
    @IsNotEmpty()
    date: Date;

    @ManyToOne(() => Nomenclature, (nomenclature) => nomenclature.goodsInwardsItems)
    nomenclature: Nomenclature

    @ManyToOne(() => GoodsInwards, (goodsInwards) => goodsInwards.goodsInwardsItems, {onDelete: 'CASCADE'})
    goodsInwards: GoodsInwards
}
