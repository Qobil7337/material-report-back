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

    // Foreign key
    @Column()
    @IsNotEmpty()
    goodsInwardsID: number;

    // Foreign key
    @Column()
    @IsNotEmpty()
    nomenclatureID: number;

    @Column({type: "enum", enum: Unit, default: Unit.kg})
    @IsNotEmpty()
    unitOfMeasure: Unit;

    @Column()
    @IsNotEmpty()
    quantity: number;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    totalSum: number;

    @Column()
    @IsNotEmpty()
    dateOfDelivery: Date;

    @ManyToOne(() => Nomenclature, (nomenclature) => nomenclature.goodsInwardsItems)
    nomenclature: Nomenclature

    @ManyToOne(() => GoodsInwards, (goodsInwards) => goodsInwards.goodsInwardsItems)
    goodsInwards: GoodsInwards
}
