import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../api/OrderItemApi";
import { ClipLoader } from "react-spinners";
import { OrderItemAdmin } from "./OrderItemAdmin";

export const OrderListAdmin: React.FC = () => {
    const {data: orders, isPending, isError, error} = useQuery({
        queryKey: ["orders"],
        queryFn: getAll,
    })
    if (isPending) return <div className="flex justify-center items-center mx-5"> <ClipLoader /> </div>
    if (isError) return <div className="flex justify-center items-center text-red-500 font-poppins">{error.message}</div>
    return (
        <div className="w-10/12 flex flex-row flex-wrap ml-2">
            {
                orders.map((order) => (
                    <OrderItemAdmin key={order.orderItemId} orderItem={order} />
                ))
            }
        </div>
    )
};