class CartItem {
    cartItemId: number;
    quantity: number;
    price: number;
    cartId: number;
    productId: number;
    
    constructor(cartItemId: number, quantity: number, price: number, cartId: number, productId: number) {
        this.cartItemId = cartItemId;
        this.quantity = quantity;
        this.price = price;
        this.cartId = cartId;
        this.productId = productId;
    }
}

export default CartItem;