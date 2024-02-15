import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store";
import { getTokenData } from "../../utils/helper";
import { getUser } from "../../api/UserApi";
import { getAllCartItemsByCartId } from "../../api/CartItemApi";
import { ClipLoader } from "react-spinners";
import { CartChild } from "./ItemCart";

export const CartList: React.FC = () => {
    const isLogin = useAppSelector(state => state.auth.isLogin);
    const data = getTokenData(localStorage.getItem("token") ?? "");
    
    // * fetch user data for display current points
    const {data: user} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(data!.id),
        enabled: isLogin,
    })
    
    const {data: cartItems, isPending, isError, error} = useQuery({
        queryKey: ["cart" , {
            type: {
                cartId: user?.cartId
            }
        }],
        queryFn: () => getAllCartItemsByCartId(user!.cartId),
        enabled: isLogin && user !== undefined,        
    })
    
    if (isError) return <div className="font-poppins text-red-400 font-bold text-center">{error.message}</div>
    if (isPending) return <div className="flex justify-center items-center mt-10"><ClipLoader /></div>
    
    return (
        <div className="mt-5">
            {
                cartItems?.length === 0 && <div className="mt-4 font-poppins text-darkBlue-100 font-normal text-center">No product in cart. You can add a new product to buy it later!!!</div>
            }
            {
                cartItems?.map((cartItem) => (
                    <CartChild key={cartItem.cartItemId} cartItem={cartItem} />
                ))
            }
        </div>
    );
};