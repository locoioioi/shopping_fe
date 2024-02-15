import User from "../models/User";
import { axiosInstance } from "../utils/helper";

interface loginRequest {
    username: string;
    password: string;
}
export const login = async (request : loginRequest) => {
    const response = await axiosInstance.post("/auth/login", request, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.data;
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return true;
};

export const getUser = async (id : string) :  Promise<User> => {
    const response = await axiosInstance.get(`/users/${id}`,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
};