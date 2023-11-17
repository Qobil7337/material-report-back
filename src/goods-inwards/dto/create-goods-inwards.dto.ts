import {Unit} from "../goods-inwards-item/goods-inwards-item.entity";

export class CreateGoodsInwardsDto {

    date: Date

    supplier: string

    warehouse: string

    goodsInwardsItems: [
        {
            nomenclatureID: number,
            nomenclatureName: string,
            unit: Unit,
            quantity: number,
            price: number,
            sum: number
        }
    ]

    totalSum: number


}
