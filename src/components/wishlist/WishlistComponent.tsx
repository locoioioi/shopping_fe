import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store";
import { getTokenData } from "../../utils/helper";
import { getUser } from "../../api/UserApi";
import { getAllWishlistItemsByWishlistId } from "../../api/WishlistItemApi";
import { ClipLoader } from "react-spinners";
import { WishlistItemComponent } from "./WishlistItemComponent";

export const WishlistsComponent: React.FC = () => {
    const data = getTokenData(localStorage.getItem("token") ?? "");
    const isLogin = useAppSelector(state => state.auth.isLogin);
    // * fetch user data for display current points
    const {data: user} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(data!.id),
        enabled: isLogin,
    })

    const {data: wishlists, isPending, isError, error} = useQuery({
        queryKey: ["wishlist" , {
            type: {
                wishlistId: user?.wishListId
            }
        }],
        queryFn: () => getAllWishlistItemsByWishlistId(user!.wishListId),
        enabled: isLogin && user !== undefined,
    })

    if (isError) return <div className="font-poppins text-red-400 font-bold text-center">{error.message}</div>
    if (isPending) return <div className="flex justify-center items-center mt-10"><ClipLoader /></div>

    return (
        <div className={wishlists.length > 0 ? `flex flex-row flex-wrap` : ""}>
            {
                wishlists?.length === 0 && <div className="mt-4 font-poppins text-darkBlue-100 font-bold text-center">No wishlist product. You can add a new wishlist to find it later!!!</div>
            }
            {
                wishlists?.map((wishlist) => (
                    <WishlistItemComponent key={wishlist.wishListItemId} wishlist={wishlist} />
                ))
            }
        </div>
    );
};