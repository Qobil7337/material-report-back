import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, IsNumber} from "class-validator";
import {Nomenclature} from "../../nomenclature/nomenclature.entity";
import {Product} from "../product.entity";


export enum Unit {
    kg = "kg",
    pc = "piece",
    litre = "litre"
}

@Entity()
export class ProductItem {
    // Primary key
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id: number;

    @ManyToOne(() => Product, (product) => product.productItems, {onDelete: 'CASCADE'})
    product: Product

    @ManyToOne(() => Nomenclature, (nomenclature) => nomenclature.productItems)
    nomenclature: Nomenclature

    @Column({type: "enum", enum: Unit, default: Unit.kg})
    @IsNotEmpty()
    unitOfMeasure: Unit;

    @Column({type: 'numeric'})
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


}
