import CartItem from "../models/CartItem";
import { axiosInstance } from "../utils/helper";

interface CartItemDto {
    cartItemId: number;
    quantity: number;
    price: number;
    cartId: number;
    product : {
        productId: number;
    }
}

export const createOrder = async ({ userId , cartItemList }: { userId: number, cartItemList: CartItemDto[] }) => {
    try {
        const response = await axiosInstance.post(`/order?user_id=${userId}`, cartItemList, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error");    
    }
};

export const updateCartItem = async (cartItem: CartItem) => {
    const response = await axiosInstance.put(`/cart-items`,{
        cartItemId: cartItem.cartItemId,
        quantity: cartItem.quantity,
        price: cartItem.price,
        cartId: cartItem.cartId,
        product: {
            productId: cartItem.productId
        }
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
};

export const deleteCartItem = async (cartItemId: number) => {
    const response = await axiosInstance.delete(`/cart-items/${cartItemId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
};

export const getAllCartItemsByCartId = async (cartId: number): Promise<CartItem[]> => {
    const response = await axiosInstance.get(`/cart-items/${cartId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const cartItems: CartItem[] = response.data.map((data: any) => createCartItem(data));
    return cartItems;
};

const createCartItem = (data: any) => {
    return new CartItem(data.cartItemId,data.quantity,data.price,data.cartId,data.product.productId);
};

export const addCartItem = async (cartItem: CartItem) => {
    const response = await axiosInstance.post("/cart-items", {
        cartItemId: cartItem.cartItemId,
        quantity: cartItem.quantity,
        price: cartItem.price,
        cartId: cartItem.cartId,
        product: {
            productId: cartItem.productId
        }
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    return response.data;
}