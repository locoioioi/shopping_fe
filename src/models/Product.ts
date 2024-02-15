import Category from "./Category";

class Product {
    id: number;
    productName: string;
    description: string;
    detail: string;
    image: string;
    pointConsume: number;
    stockQuantity: number;   
    categories: Category[];
    
    constructor(id: number, productName: string, description: string, detail: string , image: string, pointConsume: number, stockQuantity: number, categories: Category[]) {
        this.id = id;
        this.productName = productName;
        this.description = description;
        this.detail = detail;
        this.image = image;
        this.pointConsume = pointConsume;
        this.stockQuantity = stockQuantity;
        this.categories = categories;
    }
}

export default Product;