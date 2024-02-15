import { CartHeader } from "../components/cart/CartHeader";
import { CartList } from "../components/cart/CartList";
import { CartSubTotal } from "../components/cart/CartSubTotal";
import { useAppSelector } from "../store";

export const CartPage: React.FC = () => {
    const orders = useAppSelector(state => state.order);
    return (
        <>
            <CartHeader />
            <CartList />
            {
                orders.length > 0 && <CartSubTotal />
            }
        </>
    )
};