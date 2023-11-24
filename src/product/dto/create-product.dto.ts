import {Unit} from "../product-item/product-item.entity";


export class CreateProductDto {

    date: Date

    name: string

    category: string

    imageUrl: string

    productItem: [
        {
            nomenclatureID: number,
            nomenclatureName: string,
            unit: Unit,
            quantity: number,
            price: number,
            sum: number
        }
    ]

    totalCost: number

    salePrice: number

    grossProfit: number

    grossProfitMargin: number


}
