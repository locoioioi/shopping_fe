import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store";
import { getTokenData } from "../../utils/helper";
import { getUser } from "../../api/UserApi";
import { OrderItemList } from "./OrderItemList";
import { ClipLoader } from "react-spinners";

export const OrderList: React.FC = () => {
    const data = getTokenData(localStorage.getItem("token") ?? "");
    const isLogin = useAppSelector(state => state.auth.isLogin);
    // * fetch user data for display current points
    const {data: user, isPending, isError, error} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(data!.id),
        enabled: isLogin,
    })
    if (isPending) return <div className="mx-5 flex justify-center items-center"><ClipLoader /></div>
    if (isError || !user || !user.orderlist) return <div>{error ? error.message : "Error fetching data"}</div>;
    return <>
        <div className="mt-4 rounded-lg p-[2px] bg-darkBlue-100"></div>
        <h1 className="text-darkBlue-100 font-poppins text-2xl font-bold mt-4">Your Orders</h1>
        <div className="flex flex-row flex-wrap">
            {user.orderlist.map((order) => (
                        <OrderItemList key={order} order={order} />
                    ))}
        </div>
    </>
};