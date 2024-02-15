import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store";
import { getTokenData } from "../../utils/helper";
import { getUser } from "../../api/UserApi";
import { getRequestByUserId } from "../../api/RequestApi";
import { RequestItem } from "./RequestItem";
import { ClipLoader } from "react-spinners";


export const RequestList: React.FC = () => {
    const isLogin = useAppSelector(state => state.auth.isLogin);
    const data = getTokenData(localStorage.getItem("token") ?? "");
    // * fetch user data for display current points
    const {data: user} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(data!.id),
        enabled: isLogin,
    })
    // * get request data
    const {data: requests, isPending: isPendingRequest, isError: isErrorRequest, error: errorRequest} = useQuery({
        queryKey: ["requests", {
            type: {
                userId: user?.id
            }
        }],
        queryFn: () => getRequestByUserId(user!.id),
        enabled: isLogin && user !== undefined,
    })
    // sort request by status
    requests?.sort((a, b) => {
        if (a.status === "PENDING" && a.date > b.date) {
            return -1;
        }
        if (b.status === "PENDING" && b.date > a.date) {
            return 1;
        }
        return 0;
    })

    if (isPendingRequest) {
        return <div className="flex justify-center items-center">
            <ClipLoader />
        </div>
    }
    
    if (isErrorRequest) {
        return <div className="flex justify-center items-center text-red-500 font-poppins">{errorRequest.message}</div>
    }


    return (
        <div className="flex flex-row flex-wrap"> 
            {
                requests?.map((request) => {
                    return <RequestItem key={request.requestId} request={request} />
                })
            }
            {
                requests?.length === 0 && <div className="mt-4 font-poppins text-darkBlue-100 font-bold text-center">No request available. You can add a request to complete a mission!!!</div>
            }
        </div>
    )
};