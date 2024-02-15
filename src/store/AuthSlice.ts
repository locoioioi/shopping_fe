import { createSlice } from "@reduxjs/toolkit";

interface Auth {
    isLogin: boolean;
}

const initialState: Auth = {
    isLogin: localStorage.getItem("token") ? true : false
};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        }
    }
});

export default AuthSlice.reducer;
export const { login, logout } = AuthSlice.actions 