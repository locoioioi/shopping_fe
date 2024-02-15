import OrderItem from "../models/OrderItem";
import { axiosInstance } from "../utils/helper";

export const getAll = async (): Promise<OrderItem[]> => {
    const response = await axiosInstance.get("/order-item/all",{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    
    return response.data.map((data: any) => createOrderItem(data));
};

export const getOrderItemByOrderId = async (orderId: number): Promise<OrderItem[]> => {
    const response = await axiosInstance.get(`/order-item?order_id=${orderId}`,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    
    return response.data.map((data: any) => createOrderItem(data));
};

export const updateOrderItem = async ({ orderItemId, status } : { orderItemId:number, status:string}) => {
    const response = await axiosInstance.put(`/order-item?order_item_id=${orderItemId}&status=${status}`, {} ,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
}

export const deleteOrderItem = async (orderItemId: number) => {
    const response = await axiosInstance.delete(`/order-item/${orderItemId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
}

export const createOrderItem = (data: any) : OrderItem => {
    return new OrderItem(data.orderItemId, data.quantity, data.price, data.orderStatus, data.orderId, data.product.productId);    
};