import { Information } from "../components/profile/Information";
import { OrderList } from "../components/profile/OrderList";

export const ProfilePage: React.FC = () => {
    return (
        <>
            <Information /> 
            <OrderList />
        </>
    )
};