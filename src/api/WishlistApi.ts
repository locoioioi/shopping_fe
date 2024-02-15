import { axiosInstance, getTokenData } from "../utils/helper";

export const getIsAddToWishlist = async (productId: string): Promise<boolean> => {
    const data = getTokenData(localStorage.getItem("token")!);

    const response = await axiosInstance.get(`wishlist-item/isExist/${productId}/${data?.id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    
    return response.data;
}; 