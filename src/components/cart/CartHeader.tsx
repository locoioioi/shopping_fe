export const CartHeader: React.FC = () => {
    return (
        <div>
            <ul className="flex flex-row font-poppins text-darkBlue-100 font-semibold">
                <li className="w-2/12 text-right">Image</li>
                <li className="w-3/12 text-center">Description</li>
                <li className="w-2/12 text-center">Price</li>
                <li className="w-2/12 text-center">Quantity</li>
                <li className="w-2/12 text-center">Total Price</li>
            </ul>
            <div className="mt-5 p-[2px] rounded-full bg-darkBlue-100 "></div>
        </div>
    )
};