import { FilterSide } from "../components/product/Filter";
import { ProductList } from "../components/product/ProductList";

export const ProductPage: React.FC = () => {
    return (
        <section id="products">
            <div className="flex flex-row">
                <FilterSide />
                <div className="w-4/12 min-h-60"></div> 
                <ProductList />
            </div>
        </section>
    )
};