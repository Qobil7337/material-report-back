
import {Unit} from "../goods-inwards-item.entity";

export class CreateGoodsInwardsItemDto {

    goodsInwards: {
        "supplier": string,
        "warehouse": string,
        "totalSum": number,
        "date": Date
    }
    goodsInwardsItems: [
        {
            "nomenclatureID": number, // ID of the nomenclature entry to associate with
            "unitOfMeasure": Unit,
            "quantity": number,
            "price": number,
            "sum": number,
            "date": Date
        }
    ]

}
