import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "../../models/Product";
import { Link } from "react-router-dom";

export const BannerItem: React.FC<{product: Product}> = ({product}) => {
    return (
        <div className="flex flex-col items-center">
            <p className="text-darkBlue-100 font-poppins font-medium text-3xl">NEW RELEASE</p>
            <Link className="w-4/5" to={`products/${product.id}`}>
                <img src={product.image} alt="img" className=""/>
            </Link>
            <p className="text-purpleDark-100 font-poppins text-2xl font-semibold">{product.productName}</p>
            <div className="flex flex-row items-center mt-2">
                <FontAwesomeIcon icon="diamond" className="text-pinkLight-100 text-xl"/>
                <span className="ml-1 text-pinkLight-100 text-2xl font-poppins font-bold">{product.pointConsume}.00</span>
            </div>
        </div>
    );
}