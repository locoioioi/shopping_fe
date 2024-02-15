import Mission from "../models/Mission";
import { axiosInstance } from "../utils/helper";

export const getAvailableMissions = async (userId: number) :  Promise<Mission[]> => {
    const response = await axiosInstance.get(`/mission/search?user_id=${userId}`,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const missions: Mission[] = response.data.map((item: any) => createMission(item));
    return missions;
};

export const getMissionById = async (missionId: number) :  Promise<Mission> => {
    const response = await axiosInstance.get(`/mission/${missionId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    });
    const missions: Mission = createMission(response.data);
    return missions;
};

export const newMission = async ({request , reward} : {request: string, reward: number}) => {
    const response = await axiosInstance.post("/mission/create", {
        request,
        reward
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data;
};

const createMission = (data : any): Mission => {
    const mission = new Mission(
        data.missionId,
        data.request,
        data.reward,
        data.status,
    );

    return mission;
};