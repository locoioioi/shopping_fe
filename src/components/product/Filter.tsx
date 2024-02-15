import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggle } from "../../store/FilterSlice";

export const FilterSide: React.FC = () => { 
    const categories = useAppSelector((state) => state.filter.category);
    const dispatch = useAppDispatch();
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggle({name: e.currentTarget.name}));
    };
    return (
        <div className="w-3/12 fixed">
            <div className="px-6 py-5 rounded-lg bg-stone-100">
                <h3 className="text-xl text-darkBlue-100 font-poppins font-semibold ">Filter</h3>
                <div className="px-7">
                    <p className="text-lg text-darkBlue-100 font-poppins font-medium">Category</p>
                    {
                        categories.map((category) => (
                            <div key={category.name} className="flex items-center justify-between pr-6 mt-2">
                                <label htmlFor={category.name} className="hover:cursor-pointer text-darkBlue-100 font-poppins font-normal">{category.name}</label>
                                <input
                                    type="checkbox" 
                                    onChange={handleFilter}
                                    className="cursor-pointer w-4 h-4 text-purpleDark-100 bg-gray-100 border-gray-300 rounded"
                                    id={category.name} 
                                    name={category.name} 
                                    value={category.name} 
                                    checked={category.isOn}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );   
};