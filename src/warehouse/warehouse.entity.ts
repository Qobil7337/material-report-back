import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Unit} from "../goods-inwards/goods-inwards-item/goods-inwards-item.entity";


@Entity()
export class Warehouse{
    // Primary key
    @PrimaryGeneratedColumn()
    id: number

    // Foreign key array[]
    @Column()
    warehouseID: number

    // Foreign key
    @Column()
    goodsInwardsID: number

    // Foreign key
    @Column()
    nomenclatureID: number

    @Column()
    unitOfMeasure: Unit

    @Column()
    quantity: number

    @Column()
    price: number

    @Column()
    totalSum: number
}
