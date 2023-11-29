

export class CreateOrderDto {

    date: Date

    orderItems: [
        {
            imageUrl: string
            productAmount: number
            productID: number
            productName: string
            productPrice: number
            total: number
        }
    ]

    total: number

}
