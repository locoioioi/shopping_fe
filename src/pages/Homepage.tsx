import { Banner } from "../components/homepage/Banner";
import { CategorySection } from "../components/homepage/Category";
import { ProductView } from "../components/homepage/ProductView";

export const Homepage: React.FC = () => {
    return (
        <main className="mt-7">
            <Banner />
            <CategorySection />
            <ProductView />
        </main>
    )
};