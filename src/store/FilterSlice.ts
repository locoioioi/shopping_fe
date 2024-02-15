import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Filter {
    categoryId: number;
    name: string;
    isOn: boolean;
}

interface FilterInitialState {
    search: string;
    category: Filter[];
}

const initialState: FilterInitialState = {
    search: "",
    category: [
        {
            categoryId: 1,
            name: "Chill",
            isOn: false
        },
        {
            categoryId: 2,
            name: "Accessory",
            isOn: false
        },
        {
            categoryId: 3,
            name: "Fashion",
            isOn: false
        },
        {
            categoryId: 6,
            name: "Beauty",
            isOn: false
        },
        {
            categoryId: 5,
            name: "Food",
            isOn: false
        },
        {
            categoryId: 4,
            name: "Loc",
            isOn: false
        }
    ]
}

export const FilterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        searching: (state, action: PayloadAction<{search:string}>) => {
            state.search = action.payload.search;
        },
        toggle: (state, action: PayloadAction<{name:string}>) => {
            const index = state.category.findIndex(filter => filter.name === action.payload.name);
            if (index !== -1) {
                state.category[index].isOn = !state.category[index].isOn;
                state.category.map((item) => {
                    if (item.name !== action.payload.name) {
                        item.isOn = false;
                    }
                    return item; 
                });
            }
        }
    }
});

export default FilterSlice.reducer;
export const { searching, toggle } = FilterSlice.actions;