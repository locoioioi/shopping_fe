import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/ProductApi";
import { ClipLoader } from "react-spinners";
import { ProductCard } from "../product/ProductCard";
import { Pagination } from "../utils/Pagination";
export const ProductView: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["products", {type: "homepage", page: currentPage}],
        queryFn: () => getProducts(currentPage - 1),
    });
    
    // * paginate feature
    const onPageChange = (page: number) => {
        setCurrentPage(page);

    }

    // * loading spinner when the data is being fetched
    if (isLoading) return <div className="flex justify-center items-center">
        <ClipLoader />
    </div>;
    // * error message when the data fetching fails
    if (isError) {
        return <div className="flex justify-center items-center mt-4">
            <p className="text-red-500 font-poppins font-semibold text-2xl">{error.message}</p>
        </div>
    }
    // * main content
    return (
        <div>
            <h2 className="text-darkBlue-100 text-3xl font-poppins font-medium">For Chin</h2>
            <div className="p-[1px] mt-2 bg-darkBlue-100 rounded-md mb-8"></div>
            <div className="flex flex-row flex-wrap">
                {
                    data?.products.map((product) => (
                        <ProductCard key={product.id} className="w-3/12 mt-6" product={product} />
                    ))
                }
            </div>
            <Pagination key={"productsView"} currentPage={currentPage} totalPages={data?.totalPage!} onPageChange={onPageChange}/>
        </div>
    )
}