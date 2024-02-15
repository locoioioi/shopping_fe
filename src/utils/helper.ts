import { jwtDecode } from "jwt-decode";
import axios  from "axios";
import dayjs from "dayjs";
import { store } from "../store";
import { logout } from "../store/AuthSlice";


interface JwtPayload {
    sub: string;
    id: string;
    role: string[];
}

export const getTokenData = (token: string) => {
    if (token === "") return null;
    const data = jwtDecode(token);
    return data as JwtPayload;
};

let token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const baseUrl = "https://loc-and-chin-708c9285885e.herokuapp.com/api/v1";

export const axiosInstance = axios.create({
    baseURL: baseUrl,
});


// handle expired token
axiosInstance.interceptors.request.use(async req=> {
    if (req.headers.Authorization === undefined) {
        return req;
    }

    // * if token is null, get token from local storage
    if (!token) {
        token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
        req.headers.Authorization = `Bearer ${token}`;
    }
    // * check if token is expired
    const user = jwtDecode(token!);
    const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1;
    if (!isExpired) {
        return req;
    }
    // * if token is expired, get new token
    try {
        const response = await axios.post(`${baseUrl}/auth/refresh-token`,{
            refreshToken: localStorage.getItem("refreshToken")
        })
        // * update token in local storage
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        console.log("refresh token");
        // * update token in request header
        req.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return req;
    } catch (error) {
        console.log("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        store.dispatch(logout());
    }

    return req;
});