import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, IsNumber} from "class-validator";
import {Order} from "../order.entity";
import {Product} from "../../product/product.entity";



@Entity()
export class OrderItem {
    // Primary key
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id: number;

    @ManyToOne(() => Order, (order) => order.orderItems, {onDelete: 'CASCADE'})
    order: Order

    @ManyToOne(() => Product, (product) => product.orderItems)
    product: Product


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
