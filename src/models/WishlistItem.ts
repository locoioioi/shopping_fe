class WishlistItem {
    wishListItemId: number;
    product : {
        productId: number;
    }
    wishListId: number;

    constructor(wishListItemId: number, productId: number, wishListId: number) {
        this.wishListItemId = wishListItemId;
        this.product = {
            productId: productId
        }
        this.wishListId = wishListId;
    }
}

export default WishlistItem;