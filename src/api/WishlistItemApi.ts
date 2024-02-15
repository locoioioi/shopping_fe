import WishlistItem from "../models/WishlistItem";
import { axiosInstance } from "../utils/helper";

export const getWishlistItemByProductIdAndWishlistId = async (productId: number, wishlistId: number) => {
    const response = await axiosInstance.get(`/wishlist-item/product/${productId}/wishlist/${wishlistId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    const wishlistItem: WishlistItem = createWishlistItem(response.data);
    return wishlistItem;
};

export const getAllWishlistItemsByWishlistId = async (wishlistId: number) => {
    console.log("hi");
    const response = await axiosInstance.get(`/wishlist-item/${wishlistId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const wishlistItems: WishlistItem[] = response.data.map((data: any) => createWishlistItem(data));
    return wishlistItems;
};

export const deleteWishlistItem = async (wishlistItemId: number) => {
    const response = await axiosInstance.delete(`/wishlist-item/delete?wishListItemId=${wishlistItemId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
};

export const addWishlistItem = async (wishlistItem: WishlistItem) => {
    const response = await axiosInstance.post("/wishlist-item/create", wishlistItem, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data;
};

const createWishlistItem = (data: any) => {
    return new WishlistItem(data.wishListItemId,data.product.productId,data.wishlistId);
};