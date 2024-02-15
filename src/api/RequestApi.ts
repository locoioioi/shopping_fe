import Request from "../models/Request";
import { axiosInstance } from "../utils/helper";

interface RequestCreateInterface {
    missionId: number;
    userId: number;
}

export const responseRequest = async ({requestId , status} : { requestId: number, status: string }) => {
    const response = await axiosInstance.put(`/request?request_id=${requestId}&response=${status}`,{} ,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    return response.data;
};

export const getAllRequest = async () : Promise<Request[]> => {
    const response = await axiosInstance.get("/request", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const requests : Request[] = response.data.map((data: any) => generateRequest(data));
    return requests;
};    

export const getRequestByUserId = async (userId: number) : Promise<Request[]> => {
    const response = await axiosInstance.get(`/request/user/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const requests : Request[] = response.data.map((data: any) => generateRequest(data));
    return requests;
};

export const createRequest = async (requestCreated: RequestCreateInterface) => {
    const response = await axiosInstance.post("/request/create", requestCreated, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    
    return response.data;
}

const generateRequest = (data: any): Request => {
    return new Request(data.requestId, data.time, data.status, data.userId, data.missionId);
}