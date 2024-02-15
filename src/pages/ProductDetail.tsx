import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api/ProductApi";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIsAddToWishlist } from "../api/WishlistApi";
import { useAppSelector } from "../store";
import { addCartItem } from "../api/CartItemApi";
import CartItem from "../models/CartItem";
import { getUser } from "../api/UserApi";
import { getTokenData } from "../utils/helper";

export const ProductDetail: React.FC = () => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState<number>(1);
    const isLogin = useAppSelector(state => state.auth.isLogin);
    const data = getTokenData(localStorage.getItem("token") ?? "");
    
    const {data: user} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(data!.id),
        enabled: isLogin,
    })

    const {data: product, isPending: isPendingProduct, isError, error: errorProduct} = useQuery({
        queryKey: ["product", {
            type : "productDetail",
            productId: productId
        }],
        queryFn: () => getProduct(productId!),
        enabled: productId !== undefined,
    })

    const {data: isInWishlist, isPending: isPendingCheck} = useQuery({
        queryKey: ["product", {
            productId: productId,
            type: "wishlist-check"
        }],
        queryFn: () => getIsAddToWishlist(productId!),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: addCartItem,
    })

    const handleAddToCart = () => {
        const newCartItem: CartItem = {
            cartItemId: 0,
            quantity: quantity,
            price: product!.pointConsume * quantity,
            cartId: user?.cartId!,
            productId: product!.id
        } 

        mutate(newCartItem);
    };
    if (isPendingProduct) {
        return <div className="flex justify-center items-center">
            <ClipLoader />
        </div>
    }

    if (isError) {
        return <div className="flex justify-center items-center">
            <p className="font-semibold font-poppins text-red-400">Error: {errorProduct.message}</p>
        </div> 
    }
    

    return (
        <div className="flex flex-row my-14 gap-14">
            {/* Product Image */}
            <div className="w-3/12">
                <img src={product.image} className="bg-purpleDark-100 bg-opacity-5 rounded-xl" alt="" />
            </div>
            {/* Product Information */}
            <div className="w-4/12 flex flex-col gap-8">
                <h1 className="font-bold font-poppins text-2xl text-darkBlue-100">{product.productName}</h1>
                <div className="flex flex-row gap-2">
                    {
                        product.categories.length > 0 ? 
                        product.categories.map((category) => (
                            <p key={category.id} className="py-1 px-2 rounded-lg bg-purpleDark-100 bg-opacity-30 text-white ">{category.name}</p>
                        ))
                        :
                        <p className="py-1 px-2 rounded-lg bg-purpleDark-100 bg-opacity-30 text-white ">No category</p>
                    }
                </div>
                <p className="text-base font-poppins font-normal text-darkBlue-100">{product.detail}</p>
                <div className="flex flex-row items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-darkBlue-100"></div>
                    <p className="font-poppins text-lg text-darkBlue-100">Admin</p>
                </div>
            </div>
            {/*cart info*/}
            {
                isLogin && (
                    <div className="w-3/12 flex flex-col items-center gap-12">
                        <div className="flex flex-row gap-2"> 
                            <span className="text-2xl text-purpleDark-100 ">
                                <FontAwesomeIcon icon={"diamond"}/>
                            </span>
                            <span className="text-2xl font-bold text-purpleDark-100 font-poppins">{product.pointConsume * quantity}.00</span>
                        </div>

                        <div className="flex flex-row gap-3 w-2/3 justify-between items-center rounded-full py-2 px-3 border">
                            <span onClick={() => {
                                if (quantity > 1) {
                                    setQuantity((prevQuantity) => prevQuantity - 1)
                                }
                            }} className="pl-3 text-xl hover:cursor-pointer">-</span>
                            <input className="text-xl w-6 text-center" onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value > 0 && value <= product.stockQuantity) {
                                    setQuantity(value);
                                }
                            }} value={quantity}/>
                            <span onClick={() => {
                                if (quantity < product.stockQuantity) {
                                    setQuantity((prevQuantity) => prevQuantity + 1)
                                }
                            }} className="pr-3 text-xl hover:cursor-pointer">+</span>
                        </div>
                        
                        <div onClick={handleAddToCart} className="flex flex-row gap-3 w-2/3 justify-center items-center bg-purpleDark-100 text-white rounded-full py-2 px-3 hover:cursor-pointer hover:bg-opacity-75">
                            {
                                isPending && <ClipLoader size={15} />
                            }
                            {
                                !isPending && (
                                    <>
                                        <span className="font-poppins">
                                            Add to Cart
                                        </span>
                                        <FontAwesomeIcon icon={"shopping-cart"} />
                                    </>
                                )
                            }

                        </div>

                        <div className={`rounded-full w-10 h-10 flex justify-center items-center border ${isInWishlist ? "border-red-300" : "border-darkBlue-100"} drop-shadow-lg hover:cursor-pointer`}>
                            {
                                isPendingCheck && <ClipLoader size={15} />
                            }
                            <FontAwesomeIcon icon={"heart"} className={isInWishlist ? "text-red-500" :`text-darkBlue-100`}/>
                        </div>
                    </div>
                )
            }
            {
                !isLogin && (
                    <div className="w-3/12">
                        <div className="p-2 rounded-lg flex flex-col justify-around items-center bg-purpleDark-100 h-full bg-opacity-20">
                            <h3 className="text-center font-poppins text-darkBlue-100 font-medium text-xl py-1 px-4">Please log in to access to more feature of this website</h3>
                            <Link className="w-4/5 rounded-full bg-darkBlue-100 text-center text-white p-2 text-lg font-poppins" to={"/login"}>Log in</Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
};