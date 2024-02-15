import { useMutation, useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/ProductApi";
import CartItem from "../../models/CartItem";
import { ClipLoader } from "react-spinners";
import { deleteCartItem, updateCartItem } from "../../api/CartItemApi";
import { queryClient } from "../../config";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleAddToCart, updateCartItem as updateCartItemRedux } from "../../store/OrderItemSlice";

interface CartItemProps {
    cartItem: CartItem;
}
export const CartChild: React.FC<CartItemProps> = ({ cartItem }) => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(state => state.order);
    console.log(orders);
    // * check if the cartItem is selected or not
    const isSelect = orders.find(order => order.cartItemId === cartItem.cartItemId);
    // * manage the quantity of product
    const [quantity, setQuantity] = useState<number>(cartItem.quantity);
    // * fetch product data for display product detail
    const {data: product, isPending: isPendingProduct, isError, error: errorProduct} = useQuery({
        queryKey: ["product", {
            type : "productDetail",
            productId: cartItem.productId
        }],
        queryFn: () => getProduct(cartItem.productId! +""),
        enabled: cartItem !== undefined,
    })
    // * delete cartItem from cart through api
    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteCartItem,  
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            })
        },  
    })
    // * update cartItem through api
    const { mutate: updateMutate } = useMutation({
        mutationFn: updateCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            })
        },
    })

    const handleDeleteCartItem = () => {
        deleteMutate(cartItem.cartItemId);
    }

    const handleUpdateCartItem = (num : number) => {
        cartItem.quantity += num;
        cartItem.price = cartItem.quantity * product!.pointConsume;
        updateMutate(cartItem);
        setQuantity(cartItem.quantity);

        // * update redux store 
        dispatch(updateCartItemRedux({
            cartItemDto: {
                cartItemId: cartItem.cartItemId,
                quantity: cartItem.quantity,
                price: cartItem.price,
                cartId: cartItem.cartId, 
                product: {
                    productId: cartItem.productId
                }
            }
        }))
    }

    const handleAddOrder = () => {
        dispatch(toggleAddToCart({
            cartItemDto: {
                cartItemId: cartItem.cartItemId,
                quantity: cartItem.quantity,
                price: cartItem.price,
                cartId: cartItem.cartId, 
                product: {
                    productId: cartItem.productId
                }
            }
        }));
    }

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
        <div>
            <div className="flex flex-row p-2 rounded-lg items-center bg-darkBlue-100 bg-opacity-5">
                <input onClick={handleAddOrder} defaultChecked={isSelect ? true : false} type="checkbox" className="mx-11 "/>
                <img src={product.image} alt="product" className="w-36 h-36" />
                <div className="flex flex-col w-3/12 gap-2 mx-4">
                    <p className="text-darkBlue-100 font-semibold font-poppins">{product.productName}</p>
                    <p className="text-darkBlue-100 font-normal font-poppins">{product.description}</p>
                </div>
                <p className="text-darkBlue-100 font-poppins text-xl w-1/12">{product.pointConsume}.00</p>
                <div className="flex justify-center items-center w-3/12">
                    <div className="flex flex-row gap-3 justify-between items-center rounded-full py-2 px-3 border">
                        <span onClick={() => {
                            handleUpdateCartItem(-1);
                        }} className="pl-3 text-xl hover:cursor-pointer">-</span>
                        <input readOnly className="text-xl w-6 text-center bg-darkBlue-100 bg-opacity-0 text-darkBlue-100 font-poppins" value={quantity}/>
                        <span onClick={() => {
                            handleUpdateCartItem(1);
                        }} className="pr-3 text-xl hover:cursor-pointer">+</span>
                    </div>
                </div>
                <p className="text-darkBlue-100 font-poppins text-xl w-1/12 font-bold">{cartItem.price}.00</p>
                <span onClick={handleDeleteCartItem} className="py-1 px-2 flex justify-center items-center bg-red-600 rounded-md text-white hover:bg-red-400 hover:cursor-pointer">X</span>
            </div>
        </div>
    )
};