import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "../../models/Product";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getIsAddToWishlist } from "../../api/WishlistApi";
import { useAppSelector } from "../../store";
import { addCartItem } from "../../api/CartItemApi";
import CartItem from "../../models/CartItem";
import { getUser } from "../../api/UserApi";
import { getTokenData } from "../../utils/helper";
import { ClipLoader } from "react-spinners";
import { addWishlistItem, deleteWishlistItem, getWishlistItemByProductIdAndWishlistId } from "../../api/WishlistItemApi";
import { queryClient } from "../../config";

export const ProductCard: React.FC<{ product: Product, className: string }> = ({product, className}) => {
    const navigate = useNavigate();
    const handleViewDetail = () => {
        navigate(`/products/${product.id}`);
    }

    const isLogin = useAppSelector(state => state.auth.isLogin);
    const data = getTokenData(localStorage.getItem("token") ?? "");
    const {data: user} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(data!.id),
        enabled: isLogin,
    })

    const { data: isInWishlist } = useQuery({
        queryKey: ["product", {
            productId: product.id,
            type: "wishlist-check"
        }],
        queryFn: () => getIsAddToWishlist(product!.id+""),
        enabled: !!product,
    });
    

    const { mutate: mutateAddWishlist } = useMutation({
        mutationFn: addWishlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["product", {
                    productId: product.id,
                    type: "wishlist-check"
                }],
            })
            queryClient.invalidateQueries({
                queryKey: ["wishlist" , {
                    type: {
                        wishlistId: user?.wishListId
                    }
                }],
            });
        },
    })

    const { mutate: mutateDelete } = useMutation({
        mutationFn: deleteWishlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["product", {
                    productId: product.id,
                    type: "wishlist-check"
                }],
            })
            queryClient.invalidateQueries({
                queryKey: ["wishlist" , {
                    type: {
                        wishlistId: user?.wishListId
                    }
                }],
            });
        },
    })

    const toggleAddToWishlist = () => {
        if (isInWishlist) {
            getWishlistItemByProductIdAndWishlistId(product.id, user?.wishListId!).then(
                (res) => {
                    mutateDelete(res?.wishListItemId!)
                }
            )
            
        } else {
            mutateAddWishlist({
                product: {
                    productId: product.id
                },
                wishListId: user?.wishListId!,
                wishListItemId: 0
            })
        }
    }

    const { mutate, isPending } = useMutation({
        mutationFn: addCartItem,
    })

    const handleAddToCart = () => {
        const newCartItem: CartItem = {
            cartItemId: 0,
            quantity: 1,
            price: product.pointConsume,
            cartId: user?.cartId!,
            productId: product.id
        } 

        mutate(newCartItem);
    }

    return (
        <div className={className}>
            <div className="flex flex-col items-center m-2 drop-shadow-lg bg-stone-100 rounded-lg">
                <img onClick={handleViewDetail} src={product.image} className="hover:cursor-pointer hover:bg-opacity-10 rounded-tl-lg rounded-tr-lg bg-purpleDark-100 bg-opacity-5" alt={product.productName} />
                <div className="self-start px-4 py-2 rounded-br-lg rounded-bl-lg" style={{
                    width: "100%",
                }}>
                    <h3 className="text-darkBlue-100 font-poppins font-bold text-2xl">{product.productName}</h3>
                    <p className="text-darkBlue-100 font-poppins font-thin text-xs mt-2 mb-4">{product.description}</p>
                    <div className=" flex flex-row justify-between">
                        <div className="flex flex-row justify-center items-center">
                            <span>
                                <FontAwesomeIcon icon={"diamond"} className="text-darkBlue-100 text-xl"/> 
                            </span>
                            <span className="mb-1 ml-1 text-darkBlue-100 font-poppins text-xl font-bold">{product.pointConsume}.00</span>
                        </div>
                        {
                            isLogin && (
                                <button onClick={toggleAddToWishlist}>
                                    <FontAwesomeIcon icon={"heart"} className={isInWishlist ? "text-red-500 text-xl" : `text-darkBlue-100 text-xl`}/>
                                </button>
                            )
                        }
                        
                    </div>
                </div>
                <button onClick={handleAddToCart} className="p-2 mt-1 bg-purpleDark-100 w-11/12 text-white font-medium rounded-lg mb-4">
                    {isPending ? <ClipLoader size={15} color="white"/> : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}