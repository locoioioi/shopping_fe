import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderItem from "../../models/OrderItem";
import { getProduct } from "../../api/ProductApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { deleteOrderItem, updateOrderItem } from "../../api/OrderItemApi";
import { queryClient } from "../../config";

export const OrderItemAdmin: React.FC<{orderItem : OrderItem}> = ({ orderItem }) => {
    const {data: product, isPending: isPendingProduct, isError, error: errorProduct} = useQuery({
        queryKey: ["product", {
            type : "productDetail",
            productId: orderItem.product.productId
        }],
        queryFn: () => getProduct(orderItem.product.productId! +""),
        enabled: orderItem !== undefined,
    })

    const { mutate : mutateUpdate } = useMutation({
        mutationFn: updateOrderItem,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"]
            });
            queryClient.invalidateQueries({
                queryKey: ["product"]
            });
        }
    })

    const { mutate : mutateComplete } = useMutation({
        mutationFn: deleteOrderItem,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"]
            });
            queryClient.invalidateQueries({
                queryKey: ["product"]
            });
        }
    })
    const handleCompleteOrder = () => {
        mutateComplete(orderItem.orderItemId)
    }

    const handleUpdate = (status : string) => {
        mutateUpdate({
            orderItemId: orderItem.orderItemId,
            status: status
        })
    }

    if (isError) return <div className="font-poppins text-red-400 font-bold text-center">{errorProduct ? errorProduct.message : "Errorrr"}</div>
    if (isPendingProduct) return <div className="flex justify-center items-center mx-5" ><ClipLoader /></div>
    
    return (
        <div className="w-4/12 mt-1">
            <div className="flex flex-col rounded border mr-3">
                <div className="flex flex-row mt-3 items-start">
                    <img src={product?.image} alt={product?.productName} className="ml-2 w-3/12 rounded bg-darkBlue-100 bg-opacity-5" />
                    <div className="ml-2 flex-grow">
                        <div className="mb-3 font-poppins text-darkBlue-100 text-base">{product?.productName} x {orderItem.quantity}</div>
                        <div className="flex items-center gap-2  font-poppins text-darkBlue-100 text-base">
                            <FontAwesomeIcon icon={"diamond"} /> {orderItem.price}.00
                        </div>
                    </div>
                    <div className={`rounded text-center p-2 mr-2  text-white font-poppins text-xs 
                                ${orderItem.orderStatus === "PACKAGE" && "bg-green-400"} 
                                ${orderItem.orderStatus === "PREPARE" && "bg-yellow-400"}
                                ${orderItem.orderStatus === "SHIP" && "bg-blue-400"}
                                `}>
                                    {orderItem.orderStatus}
                    </div>
                </div>
                <div className="flex flex-row justify-around gap-2 mt-2">
                    <div onClick={() => {
                        handleUpdate("Ship")
                    }} className="p-2 rounded bg-darkBlue-100 flex-grow ml-2 text-center text-white my-2 hover:cursor-pointer hover:bg-opacity-85">SHIPPING</div>
                    <div onClick={() => {
                        handleUpdate("Package")
                    }} className="p-2 rounded bg-green-400 flex-grow  text-center text-white my-2 hover:cursor-pointer hover:bg-opacity-85">PACKAGE</div>
                    <div onClick={handleCompleteOrder} className="p-2 rounded bg-red-400 flex-grow mr-2 text-center text-white my-2 hover:cursor-pointer hover:bg-opacity-85">COMPETE</div>
                </div>
            </div>
        </div>
    )
};