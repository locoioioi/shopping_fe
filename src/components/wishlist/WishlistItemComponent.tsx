import { useQuery } from "@tanstack/react-query";
import WishlistItem from "../../models/WishlistItem";
import { getProduct } from "../../api/ProductApi";
import { ProductCard } from "../product/ProductCard";
import { ClipLoader } from "react-spinners";

interface WishlistItemProps {
    wishlist: WishlistItem;
}

export const WishlistItemComponent: React.FC<WishlistItemProps> = ({ wishlist }) => {

    const {data: product, isPending} = useQuery({
        queryKey: ["product", {
            type: "productDetail",
            productId: wishlist.product.productId
        }],
        queryFn: () => getProduct(wishlist.product.productId + ""),
        enabled: wishlist !== undefined,
    })
    if (isPending) return <div><ClipLoader /></div>
    return (
        <>
            <ProductCard key={product?.id} product={product!} className="w-3/12 mt-6" />
        </>
    );
};