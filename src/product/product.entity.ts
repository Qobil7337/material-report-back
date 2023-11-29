import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {ProductItem} from "./product-item/product-item.entity";
import {OrderItem} from "../order/order-item/order-item.entity";



@Entity()
export class Product {
    // Primary key
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    category: string;

    @Column()
    @IsNotEmpty()
    imageUrl: string;

    @Column()
    @IsNotEmpty()
    totalCost: number;

    @Column()
    @IsNotEmpty()
    salePrice: number;

    @Column()
    @IsNotEmpty()
    grossProfit: number;

    @Column({type: 'numeric'})
    @IsNotEmpty()
    grossProfitMargin: number;

    @Column()
    @IsNotEmpty()
    date: Date;

    @OneToMany(() => ProductItem, (productItem) => productItem.product)
    productItems: ProductItem[]

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[]
}
