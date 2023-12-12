import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Warehouse} from "./warehouse.entity";
import {Repository} from "typeorm";
import {CreateGoodsInwardsDto} from "../goods-inwards/dto/create-goods-inwards.dto";
import {GoodsInwards} from "../goods-inwards/goods-inwards.entity";
import {Nomenclature} from "../nomenclature/nomenclature.entity";
import {CreateOrderDto} from "../order/dto/create-order.dto";
import {Product} from "../product/product.entity";
import {Unit} from "../goods-inwards/goods-inwards-item/goods-inwards-item.entity";
import {Order} from "../order/order.entity";

@Injectable()
export class WarehouseService {

    constructor(@InjectRepository(Warehouse) private warehouseRepository: Repository<Warehouse>,
                @InjectRepository(Product) private productRepository: Repository<Product>) {
    }

    findAll() {
        return this.warehouseRepository.find({
            relations: ['inventory']// Include the necessary relationships
        })
    }

    async onSaveGoodsInwards(dto: CreateGoodsInwardsDto) {
        const warehouseItems = await this.warehouseRepository.find({ relations: ['inventory'] });
        const goodsInwardsItems = dto.goodsInwardsItems;

        // Find items from array1 that are present in array2
        const matchingItems = warehouseItems.filter(item1 =>
            goodsInwardsItems.some(item2 => item1.inventory.id === item2.nomenclatureID)
        );

        // Find items from array2 that are not present in array1
        const missingItems = goodsInwardsItems.filter(item2 =>
            !warehouseItems.some(item1 => item1.inventory.id === item2.nomenclatureID)
        );

        await Promise.all(
            missingItems.map(async (item) => {
                const inventory = new Warehouse();
                inventory.inventory = { id: item.nomenclatureID } as Nomenclature; // Assuming inventory is a Nomenclature entity
                inventory.unitOfMeasure = item.unit;
                inventory.accountingBalance = Number((Number(item.quantity)).toFixed(3));
                await this.warehouseRepository.save(inventory);
            })
        );

        await Promise.all(
            matchingItems.map(async (item) => {
                const goodsInwardsItem = goodsInwardsItems.find(goodsItem => item.inventory.id === goodsItem.nomenclatureID);
                if (goodsInwardsItem) {
                    item.accountingBalance = Number(((Number(item.accountingBalance) + Number(goodsInwardsItem.quantity)).toFixed(3)))
                    await this.warehouseRepository.save(item);
                }
            })
        );
    }


    async onRemoveGoodsInwards(goodsInwards: GoodsInwards) {
        const goodsInwardsItems = goodsInwards.goodsInwardsItems;

        // Ensure goodsInwardsItems is not null or undefined
        if (goodsInwardsItems) {
            const warehouseItems = await this.warehouseRepository.find({ relations: ['inventory'] });

            await Promise.all(
                goodsInwardsItems.map(async (goodsInwardsItem) => {
                    // Ensure goodsInwardsItem.nomenclature is not null or undefined
                    if (goodsInwardsItem.nomenclature) {
                        const warehouseItem = warehouseItems.find((item) => item.inventory.id === goodsInwardsItem.nomenclature.id);

                        // Ensure warehouseItem is not null or undefined
                        if (warehouseItem) {
                            // Handle asynchronous operations and convert accountingBalance to a number
                            warehouseItem.accountingBalance = Number(warehouseItem.accountingBalance) - Number(goodsInwardsItem.quantity);

                            // Save changes to the database
                            await this.warehouseRepository.save(warehouseItem);
                        }
                    }
                })
            );
        }
    }

    async onSaveOrder(dto: CreateOrderDto) {
        const orderItems = dto.orderItems;

        try {
            for (const orderItem of orderItems) {
                const product = await this.productRepository.findOne({
                    where: { id: orderItem.productID },
                    relations: ['productItems', 'productItems.nomenclature'],
                });

                const productItems = product.productItems;

                for (const productItem of productItems) {
                    // Fetch warehouseItems for every iteration of productItems
                    const warehouseItems = await this.warehouseRepository.find({ relations: ['inventory'] });

                    // Find the corresponding warehouse item
                    const warehouseItem = warehouseItems.find(
                        (item) => item.inventory.id === productItem.nomenclature.id
                    );

                    if (warehouseItem) {
                        const value = orderItem.productAmount * productItem.quantity;
                        warehouseItem.accountingBalance = Number(
                            (Number(warehouseItem.accountingBalance) - value).toFixed(2)
                        );
                        await this.warehouseRepository.save(warehouseItem);
                    } else {
                        const newWarehouseItem = new Warehouse();
                        newWarehouseItem.inventory = productItem.nomenclature;
                        newWarehouseItem.unitOfMeasure = productItem.unitOfMeasure as Unit;
                        newWarehouseItem.accountingBalance = Number(
                            (-1 * orderItem.productAmount * productItem.quantity).toFixed(2)
                        );
                        // Save the new Warehouse instance
                        await this.warehouseRepository.save(newWarehouseItem);
                    }
                }
            }
        } catch (error) {
            console.error('Error processing order items:', error.message);
            // Handle the error as needed
        }
    }





    async onRemoveOrder(order: Order) {
        const orderItems = order.orderItems;

        try {
            for (const orderItem of orderItems) {
                const product = await this.productRepository.findOne({
                    where: { id: orderItem.product.id },
                    relations: ['productItems', 'productItems.nomenclature'],
                });

                const productItems = product.productItems;

                for (const productItem of productItems) {
                    // Fetch warehouseItems for every iteration of productItems
                    const warehouseItems = await this.warehouseRepository.find({ relations: ['inventory'] });

                    // Find the corresponding warehouse item
                    const warehouseItem = warehouseItems.find(
                        (item) => item.inventory.id === productItem.nomenclature.id
                    );

                    if (warehouseItem) {
                        const value = orderItem.quantity * productItem.quantity;
                        warehouseItem.accountingBalance = Number(
                            (Number(warehouseItem.accountingBalance) + value).toFixed(2)
                        );
                        await this.warehouseRepository.save(warehouseItem);
                    } else {
                        const newWarehouseItem = new Warehouse();
                        newWarehouseItem.inventory = productItem.nomenclature;
                        newWarehouseItem.unitOfMeasure = productItem.unitOfMeasure as Unit;
                        newWarehouseItem.accountingBalance = Number(
                            (orderItem.quantity * productItem.quantity).toFixed(2)
                        );
                        // Save the new Warehouse instance
                        await this.warehouseRepository.save(newWarehouseItem);
                    }
                }
            }
        } catch (error) {
            console.error('Error processing order items:', error.message);
            // Handle the error as needed
        }
    }



    // // Find items from array1 that are present in array2
        // const matchingItems = warehouseItems.filter(item1 =>
        //     orderItems.some(item2 => item1.inventory.id === item2.)
        // );
        //
        // // Find items from array2 that are not present in array1
        // const missingItems = goodsInwardsItems.filter(item2 =>
        //     !warehouseItems.some(item1 => item1.inventory.id === item2.nomenclatureID)
        // );
        //
        // await Promise.all(
        //     missingItems.map(async (item) => {
        //         const inventory = new Warehouse();
        //         inventory.inventory = { id: item.nomenclatureID } as Nomenclature; // Assuming inventory is a Nomenclature entity
        //         inventory.unitOfMeasure = item.unit;
        //         inventory.accountingBalance = Number((Number(item.quantity)).toFixed(3));
        //         await this.warehouseRepository.save(inventory);
        //     })
        // );
        //
        // await Promise.all(
        //     matchingItems.map(async (item) => {
        //         const goodsInwardsItem = goodsInwardsItems.find(goodsItem => item.inventory.id === goodsItem.nomenclatureID);
        //         if (goodsInwardsItem) {
        //             item.accountingBalance = Number(((Number(item.accountingBalance) + Number(goodsInwardsItem.quantity)).toFixed(3)))
        //             await this.warehouseRepository.save(item);
        //         }
        //     })
        // );


    // async onRemoveOrder(goodsInwards: GoodsInwards) {
    //     const goodsInwardsItems = goodsInwards.goodsInwardsItems;
    //
    //     // Ensure goodsInwardsItems is not null or undefined
    //     if (goodsInwardsItems) {
    //         const warehouseItems = await this.warehouseRepository.find({ relations: ['inventory'] });
    //
    //         await Promise.all(
    //             goodsInwardsItems.map(async (goodsInwardsItem) => {
    //                 // Ensure goodsInwardsItem.nomenclature is not null or undefined
    //                 if (goodsInwardsItem.nomenclature) {
    //                     const warehouseItem = warehouseItems.find((item) => item.inventory.id === goodsInwardsItem.nomenclature.id);
    //
    //                     // Ensure warehouseItem is not null or undefined
    //                     if (warehouseItem) {
    //                         // Handle asynchronous operations and convert accountingBalance to a number
    //                         warehouseItem.accountingBalance = Number(warehouseItem.accountingBalance) - Number(goodsInwardsItem.quantity);
    //
    //                         // Save changes to the database
    //                         await this.warehouseRepository.save(warehouseItem);
    //                     }
    //                 }
    //             })
    //         );
    //     }
    // }

}

// await Promise.all(
//     goodsInwardsItems.map(async (goodsInwardsItem) => {
//         // Ensure goodsInwardsItem.nomenclature is not null or undefined
//         if (goodsInwardsItem.nomenclature) {
//             const warehouseItem = warehouseItems.find((item) => item.inventory.id === goodsInwardsItem.nomenclature.id);
//
//             // Ensure warehouseItem is not null or undefined
//             if (warehouseItem) {
//                 // Handle asynchronous operations and convert accountingBalance to a number
//                 warehouseItem.accountingBalance = Number(
//                     (Number(warehouseItem.accountingBalance) - Number(goodsInwardsItem.quantity)).toFixed(3)
//                 );
//
//                 if (warehouseItem.accountingBalance <= 0) {
//                     // If accountingBalance is <= 0, remove the row
//                     await this.warehouseRepository.remove(warehouseItem);
//                 } else {
//                     // If accountingBalance is > 0, save changes to the database
//                     await this.warehouseRepository.save(warehouseItem);
//                 }
//             }
//         }
//     })
// );


