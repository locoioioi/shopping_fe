import { useQuery } from "@tanstack/react-query";
import OrderItem from "../../models/OrderItem";
import { getProduct } from "../../api/ProductApi";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const OrderItemDetail: React.FC<{ orderItem: OrderItem }> = ({ orderItem }) => {
    const {data: product, isPending: isPendingProduct, isError, error: errorProduct} = useQuery({
        queryKey: ["product", {
            type : "productDetail",
            productId: orderItem.product.productId
        }],
        queryFn: () => getProduct(orderItem.product.productId! +""),
        enabled: orderItem !== undefined,
    })
    if (isError) return <div className="font-poppins text-red-400 font-bold text-center">{errorProduct ? errorProduct.message : "Errorrr"}</div>
    if (isPendingProduct) return <div className="flex justify-center items-center mx-5" ><ClipLoader /></div>
    
    return (
        <div className="w-4/12">
            <div className="flex flex-col rounded border mt-3 mr-3">
                <div className="flex flex-row mt-3 ">
                    <img src={product?.image} alt={product?.productName} className="ml-2 w-3/12 rounded bg-darkBlue-100 bg-opacity-5" />
                    <div className="ml-2">
                        <div className="mb-3 font-poppins text-darkBlue-100 text-base">{product?.productName} x {orderItem.quantity}</div>
                        <div className="flex items-center gap-2  font-poppins text-darkBlue-100 text-base">
                            <FontAwesomeIcon icon={"diamond"} /> {orderItem.price}.00
                        </div>
                    </div>
                </div>
                <div className={`rounded text-center p-2 m-2 text-white font-poppins text-base 
                                ${orderItem.orderStatus === "PACKAGE" && "bg-green-400"} 
                                ${orderItem.orderStatus === "PREPARE" && "bg-yellow-400"}
                                ${orderItem.orderStatus === "SHIP" && "bg-blue-400"}
                                `}>{orderItem.orderStatus}</div>
            </div>
        </div>
    )
};