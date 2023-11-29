import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {OrderItem} from "./order-item/order-item.entity";



@Entity()
export class Order {
    // Primary key
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNotEmpty()
    date: Date;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: OrderItem[]

    @Column()
    @IsNotEmpty()
    total: number;
}
