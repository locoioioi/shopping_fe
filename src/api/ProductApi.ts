import Category from "../models/Category";
import Product from "../models/Product";
import { axiosInstance } from "../utils/helper"
interface ProductInterface {
    products: Product[];
    totalPage: number;

}
export const getProduct = async (id: string): Promise<Product> => {
    const response = await axiosInstance.get(`/products/${id}`);
    if (response.status !== 200) {
        throw new Error("Failed to get product");
    }
    const product : Product = createProduct(response.data);
    return product;
};

export const getProducts = async (page: number): Promise<ProductInterface> => {
    const response = await axiosInstance.get(`/products?page=${page}&size=8`);
    const products: Product[] = response.data.content.map((item: any) => createProduct(item));
    const totalPage = response.data.totalPages;
    
    return { products, totalPage };
};
export const getNewRelease = async ():Promise<Product[]>=> {
    const responseData = await axiosInstance.get('products/new');
    const products: Product[] = responseData.data.map((item : any) => createProduct(item));
    
    return products;
};

export const getProductSearchAndFilter = async (page: number, search: string, category: string): Promise<ProductInterface> => {
    let url = `/products?page=${page}&size=9`;
    if (search) {
        url = `/products/search?page=${page}&size=9&productName=${search}`;
    } 
    if (category) {
        url = `/products/search-category?page=${page}&size=9&productName=${search}&categoryName=${category}`;
    }
    const response = await axiosInstance.get(url);
    const products: Product[] = response.data.content.map((item: any) => createProduct(item));
    const totalPage = response.data.totalPages;
    return { products, totalPage };
};

export const newProduct = async (product: Product) => {
    const response = await axiosInstance.post("/products", {
        productId : product.id,
        productName : product.productName,
        pointConsume : product.pointConsume,
        description : product.description,
        detail : product.detail,
        stockQuantity : product.stockQuantity,
        image : product.image,
        categories : product.categories.map((category) => {
            return {
                categoryId : category.id,
                name : category.name
            }
        })
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
};

const createProduct = (data : any): Product => {
    const categories : Category[] = [];
    for (const category of data.categories) {
        const newCategory = new Category(
            category.categoryId,
            category.name
        );
        categories.push(newCategory);
    }

    const product = new Product(
        data.productId,
        data.productName,
        data.description,
        data.detail,
        data.image,
        data.pointConsume,
        data.stockQuantity,
        categories
    );
    return product;
}