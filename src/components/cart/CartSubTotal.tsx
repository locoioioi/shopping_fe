import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../store";
import { createOrder } from "../../api/CartItemApi";
import { getTokenData } from "../../utils/helper";
import { getUser } from "../../api/UserApi";
import { queryClient } from "../../config";
import { removeCartItem } from "../../store/OrderItemSlice";

export const CartSubTotal: React.FC = () => {
    const orders = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const data = getTokenData(localStorage.getItem("token") ?? "");
    const isLogin = useAppSelector(state => state.auth.isLogin);


    // * fetch user data for display current points
    const {data: user} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(data!.id),
        enabled: isLogin,
    })

    const { mutate, isError} = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            })
        },
    })
    
    const handleCheckOut = () => {
        mutate({
            userId: user!.id,
            cartItemList: orders
        })
        if (!isError) {
            orders.forEach(order => {
                dispatch(removeCartItem({
                    cartItemId: order.cartItemId
                }));
            })
        }
    } 
    return <>
        <div className="mt-4 rounded-lg p-[2px] bg-darkBlue-100"></div>
        <div className="mt-4 flex flex-row items-center justify-between pl-10 pr-32">
            <p className="text-darkBlue-100 font-poppins text-xl font-medium">
                Subtotal: {orders.reduce((prev, current) => {
                    return prev + current.price;
                }, 0)}
            </p>
            <div onClick={handleCheckOut} className="px-4 py-2 rounded-md bg-purpleDark-100 text-white font-poppins font-semibold text-base hover:cursor-pointer hover:bg-opacity-80">Check out</div>
        </div>
        {
        isError &&
            <div className="text-right pr-52 mt-1 text-red-500 font-poppins text-base">Error</div>
        }
    </>;
};