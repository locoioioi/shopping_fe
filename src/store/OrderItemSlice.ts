import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItemDto {
    cartItemId: number;
    quantity: number;
    price: number;
    cartId: number;
    product : {
        productId: number;
    }
}


const initialState: CartItemDto[] = [];

export const orderItemSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        toggleAddToCart: (state, action: PayloadAction<{ cartItemDto: CartItemDto }>) => {
            const existingCartItem = state.find(cartItem => cartItem.cartItemId === action.payload.cartItemDto.cartItemId);
            if (existingCartItem) {
                // * If the item already exists, remove it from the cart
                return state.filter(cartItem => cartItem.cartItemId !== action.payload.cartItemDto.cartItemId);
            } else {
                // * If the item doesn't exist, add it to the cart
                state.push(action.payload.cartItemDto);
            }
        },
        removeCartItem: (state, action: PayloadAction<{ cartItemId: number }>) => {
            return state.filter(cartItem => cartItem.cartItemId !== action.payload.cartItemId);
        },
        updateCartItem: (state, action: PayloadAction<{cartItemDto : CartItemDto}>) => {
            // * remove cartItem from cart if quantity is 0
            if (action.payload.cartItemDto.quantity === 0) {
                return state.filter(cartItem => cartItem.cartItemId !== action.payload.cartItemDto.cartItemId);
            }
            // * update cartItem in cart
            const index = state.findIndex(cartItem => cartItem.cartItemId === action.payload.cartItemDto.cartItemId);
            state[index] = action.payload.cartItemDto;
        }
    }
});
export default orderItemSlice.reducer;
export const { toggleAddToCart, updateCartItem, removeCartItem } = orderItemSlice.actions;