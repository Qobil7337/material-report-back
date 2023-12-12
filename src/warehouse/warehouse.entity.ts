import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Unit} from "../goods-inwards/goods-inwards-item/goods-inwards-item.entity";
import {Nomenclature} from "../nomenclature/nomenclature.entity";


@Entity()
export class Warehouse{
    // Primary key
    @PrimaryGeneratedColumn()
    id: number

    // Foreign key
    @ManyToOne(() => Nomenclature, (nomenclature) => nomenclature.inventory)
    inventory: Nomenclature

    @Column()
    unitOfMeasure: Unit

    @Column({type: "numeric"})
    accountingBalance: number

}
