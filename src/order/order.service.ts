import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Order} from "./order.entity";
import {OrderItem} from "./order-item/order-item.entity";
import {CreateOrderDto} from "./dto/create-order.dto";
import {ProductService} from "../product/product.service";

@Injectable()
export class OrderService {


    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
                @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
                private productService: ProductService
    ) {
    }


    // Assuming you have a function to save data
    async create (dto: CreateOrderDto) {
        // Create GoodsInwards instance
        const order = new Order();
        order.date = dto.date;
        order.total = dto.total;

        // Save GoodsInwards instance
        await this.orderRepository.save(order);

        // Create and save OrderItems instances
        for (const itemData of dto.orderItems) {
            const orderItem = new OrderItem();
            orderItem.order = order; // Set the relationship
            // @ts-ignore
            orderItem.product = await this.productService.findOne(itemData.productID) // Set the relationship with Nomenclature
            orderItem.quantity = itemData.productAmount;
            orderItem.price = itemData.productPrice;
            orderItem.sum = itemData.total;
            orderItem.date = dto.date;

            // Save GoodsInwardsItem instance
            await this.orderItemRepository.save(orderItem);
        }
        console.log(dto)
    }

    findAll() {
        return this.orderRepository.find({
            relations: ['orderItems', 'orderItems.product'], // Include the necessary relationships
        })
    }


    async remove(id:number) {
        const order = await this.orderRepository.findOne({where: {id: id}})
        await this.orderRepository.remove(order)
    }
}


