class OrderItem {
    orderItemId : number;
    quantity : number;
    price : number;
    orderStatus: string;
    orderId : number;
    product : {
        productId: number;
    };
    constructor(orderItemId: number, quantity: number, price: number, orderStatus: string, orderId: number, productId: number) {
        this.orderItemId = orderItemId;
        this.quantity = quantity;
        this.price = price;
        this.orderStatus = orderStatus;
        this.orderId = orderId;
        this.product = {
            productId: productId
        }
    }
}

export default OrderItem;