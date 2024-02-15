import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "../../models/Category";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { toggle } from "../../store/FilterSlice";
import { searching } from "../../store/FilterSlice";
export const CategoryItem : React.FC<{category: Category}> = ({category}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleCategoryClick = () => {
        // * dispatch the category name to filter
        dispatch(toggle({name: category.name}));
        // * dispatch the search to empty for displaying all products
        dispatch(searching({search: ""}));
        // * navigate to product page
        navigate(`/products`);
        window.scrollTo(0, 0);
    }
    return (
        <div onClick={handleCategoryClick} className="w-2/12 flex flex-col bg-darkBlue-100 rounded p-3 hover:bg-opacity-90 hover:cursor-pointer drop-shadow-lg">
            <img src={category.image} alt={category.name} />
            <p className="font-poppins font-bold text-xl text-white mt-2">{category.name}</p>
            <div className="flex items-center gap-1">
                <span className="text-pinkLight-100 text-xs font-poppins">More</span>
                <span>
                    <FontAwesomeIcon icon="caret-right" className="text-pinkLight-100 text-xs font-poppins mb-[1.5px]" />
                </span>
            </div>
        </div>
    )
}