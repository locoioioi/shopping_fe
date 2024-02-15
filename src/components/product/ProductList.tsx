import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../store";
import { searching } from "../../store/FilterSlice";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductSearchAndFilter } from "../../api/ProductApi";
import { ProductCard } from "./ProductCard";
import { ClipLoader } from "react-spinners";
import { Pagination } from "../utils/Pagination";

export const ProductList: React.FC = () => {
    // * get the search content from the store
    const [currentPage, setCurrentPage] = useState<number>(1);
    const search = useAppSelector(state => state.filter.search);
    const category = useAppSelector(state => state.filter.category.find(category => category.isOn));
    const [searchContent, setSearchContent] = useState<string>(search);
    const dispatch = useAppDispatch();
    
    // * broadcast the search content to the store
    const handleSearch = () => {
        dispatch(searching({search: searchContent}));
        setSearchContent("");
    };

    const {data, isError, isPending, error} = useQuery({
        queryKey: ["search", {
            currentPage: currentPage,
            search: search,
            category: category
        }],
        queryFn: () => getProductSearchAndFilter(currentPage - 1,search, category?.name!),
    })
    const handleChangePage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };
    return (
        
        <div className="w-8/12">
            {/*Search bar*/}
            <div className="flex flex-row justify-between items-center px-4 py-5 rounded-lg bg-stone-100">
                <p className="text-darkBlue-100 font-poppins font-medium text-lg">Search</p>
                <div className="w-1/2">
                    <input className="rounded text-base text-darkBlue-100 pl-2 p-1 w-5/6 font-normal" placeholder="search here babi..." value={searchContent} onChange={(e) => {
                        setSearchContent(e.target.value);
                    }} type="text"/>

                    <button onClick={handleSearch} className="ml-2 px-2 py-1 rounded bg-purpleDark-100 text-white">
                        <FontAwesomeIcon icon="search" />
                    </button>
                </div>
            </div>
            {/*Product list*/}
            <div className="flex flex-wrap">
                {
                    isPending && <ClipLoader />
                }
                {
                    isError && <p className="text-red-400 font-poppins font-medium text-xl">Error: {error.message}</p>
                }
                {
                    data?.products.map((product) => (
                        <ProductCard key={product.id} className="w-4/12 mt-6" product={product} />
                    ))
                }
                {
                    data?.products.length === 0 && <p className="text-darkBlue-100 font-poppins font-medium text-xl text-center p-2">No product found</p>
                }
            </div>
            {
                data?.products.length !== 0 && (
                    <div className="float-right">
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={data?.totalPage!} 
                            onPageChange={handleChangePage}
                        />
                    </div>
                )
            }
        </div>
    )
};