import { useMutation } from "@tanstack/react-query";
import Category from "../models/Category";
import Product from "../models/Product";
import { useAppSelector } from "../store";
import { newProduct } from "../api/ProductApi";

export const CreateProduct: React.FC<{}> = () => { 
    const { mutate } = useMutation({
        mutationFn: newProduct,
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const categoryData : Category[] = formData.getAll("category").map((category) => {
            return {
                id: parseInt(category as string),
                name: "",
            }
        });
        const imageData = await getBase64(formData.get("image") as File);
        const product : Product = {
            id: 0,
            productName: formData.get("productName") as string,
            pointConsume: parseInt(formData.get("pointConsume") as string),
            stockQuantity: parseInt(formData.get("stockQuantity") as string),
            description: formData.get("description") as string, 
            detail: formData.get("detail") as string,
            categories: categoryData,
            image: imageData!,
        }

        mutate(product);
    };
    
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };

    const categories = useAppSelector(state => state.filter.category);

    return (
        <div className="w-10/12 flex justify-center ">
            <div className="w-1/2 border rounded p-3">
                <h1 className="text-purpleDark-100 text-2xl font-poppins font-semibold">Product</h1>
                <form onSubmit={handleSubmit} className="flex flex-col mt-3">
                    <label htmlFor="name" className="text-darkBlue-100 text-base font-poppins">Name</label>
                    <input id="name" required type="text" name="productName" placeholder="Product Name" className="rounded p-2 mt-2 border" />
                    <div className=" flex flex-row my-2">
                        <div> 
                            <label htmlFor="point" className="text-darkBlue-100 text-base font-poppins">Point</label>
                            <input id="point" required type="number" name="pointConsume" placeholder="Point consume" className="rounded p-2 mt-2 border" />
                        </div>
                        <div> 
                            <label htmlFor="stock" className="text-darkBlue-100 text-base font-poppins">Stock</label>
                            <input id="stock" required type="number" name="stockQuantity" placeholder="Stock Quantity" className="rounded p-2 mt-2 border" />
                        </div>
                    </div>
                    <label htmlFor="description" className="text-darkBlue-100 text-base font-poppins mt-2">Description</label>
                    <input id="description" required name="description" placeholder="Description" className="rounded p-2 mt-2 border" />

                    <label htmlFor="detail" className="text-darkBlue-100 text-base font-poppins mt-2">Detail</label>
                    <textarea id="detail" required name="detail" placeholder="Detail" className="rounded p-2 mt-2 border" />

                    <label htmlFor="image" className="text-darkBlue-100 text-base font-poppins mt-2">Image</label>
                    <input id="image" required type="file" name="image" accept="image/*" placeholder="Image" className="rounded p-2 mt-2 border" />

                    <fieldset className="mt-3 border rounded">
                        <legend className="ml-2 text-darkBlue-100 text-base font-poppins">Category</legend>
                        <div className="flex flex-row flex-wrap p-2">
                            {
                                categories.map((category) => (
                                    <div key={category.categoryId} className="w-4/12">
                                        <input type="checkbox" id={category.name} name="category" value={category.categoryId} />
                                        <label htmlFor={category.name} className="ml-2 text-darkBlue-100 font-poppins">{category.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </fieldset>

                    <button type="submit" className="mt-3 bg-purpleDark-100 text-white font-poppins rounded p-2">Create</button>
                </form>
            </div>
        </div>
    )
}
