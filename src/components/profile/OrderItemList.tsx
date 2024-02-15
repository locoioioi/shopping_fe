import { useQuery } from "@tanstack/react-query";
import { getOrderItemByOrderId } from "../../api/OrderItemApi";
import { ClipLoader } from "react-spinners";
import { OrderItemDetail } from "./OrderItemDetail";

interface OrderItemListProps {
    order: number;
}
export const OrderItemList: React.FC<OrderItemListProps> = ({ order }) => {
    const {data: orderItems, isPending, isError, error} = useQuery({
        queryKey: ["order", {
            type: "orderItem",
            orderId: order
        }],
        queryFn: () => getOrderItemByOrderId(order),
    })
    if (isPending) return <div className="flex justify-center items-center mx-5" ><ClipLoader /></div>
    if (isError) return <div className="font-poppins text-red-400 font-bold text-center">{error ? error.message : "Errorrr"}</div>
    return <>
        <>
            {
                orderItems?.map((orderItem) => (
                    <OrderItemDetail key={orderItem.orderItemId} orderItem={orderItem} />
                ))
            }
        </>
    </>
};