
import {Unit} from "../goods-inwards-item.entity";

export class CreateGoodsInwardsItemDto {

    goodsInwardsID: number;


    nomenclatureID: number;


    unitOfMeasure: Unit;


    quantity: number;


    price: number;


    totalSum: number;


    dateOfDelivery: Date;

}
