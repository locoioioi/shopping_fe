import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import FilterSlice from "./FilterSlice";
import OrderItemSlice from "./OrderItemSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        filter: FilterSlice,
        order: OrderItemSlice,
    }
});

export const useAppDispatch: () => typeof store.dispatch= useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector; 