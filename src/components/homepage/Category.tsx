import Category from "../../models/Category";
import accessoriesImg from "../../assests/image/accessory-category.png";
import chillImg from "../../assests/image/chill-category.png";
import fashionImg from "../../assests/image/fashion.png";
import locImg from "../../assests/image/loc-category.png";
import foodImg from "../../assests/image/food.png";
import beautyImg from "../../assests/image/beauty.png";
import { CategoryItem } from "./CategoryItem";

export const CategorySection: React.FC = () => {
    const categories: Category[] = [
        {
            id: 1,
            name: "Chill",
            image: chillImg
        },
        {
            id: 2,
            name: "Accessories",
            image: accessoriesImg
        },
        {
            id: 3,
            name: "Fashion",
            image: fashionImg
        },
        {
            id: 4,
            name: "Loc",
            image: locImg
        },
        {
            id: 5,
            name: "Food",
            image: foodImg
        },
        {
            id: 6,
            name: "Beauty",
            image: beautyImg
        }
    ];
    return (
        <section id="category" className="mt-10 mb-20">
            <div className="flex flex-row gap-3">
                {
                    categories.map((category) => {
                        return (
                            <CategoryItem key={category.id} category={category} />
                        )
                    })
                }
            </div>
        </section>
    );
};